import axios, { AxiosInstance } from 'axios'

import { API_URL } from '../config/api'
import Endereco from '../models/Endereco'
import { clientRedis } from '../config/redis'

class EnderecoController {
  private _http: AxiosInstance

  constructor() {
    this._http = axios.create({
      baseURL: API_URL,
    })
  }

  async findByCEP(cep: string): Promise<Endereco> {
    const sanitizedCEP = cep.replace(/-/g, '')

    const value = await clientRedis.get(sanitizedCEP)

    if (value) {
      const endereco: Endereco = JSON.parse(value)
      return endereco
    } else {
      try {
        const response = await this._http.get(`/${sanitizedCEP}/json`)

        if (response.status == 200) {
          const { erro } = response.data

          if (erro) {
            const endereco: Endereco = {
              mensagemErro: 'CEP não encontrado',
              statusErro: 404,
            }

            return endereco
          }

          const { cep, logradouro, complemento, bairro, localidade, uf } =
            response.data

          const endereco: Endereco = Object.assign(
            {},
            cep ? { cep } : null,
            logradouro ? { logradouro } : null,
            complemento ? { complemento } : null,
            bairro ? { bairro } : null,
            localidade ? { localidade } : null,
            uf ? { uf } : null
          )

          await clientRedis.set(sanitizedCEP, JSON.stringify(endereco))

          return endereco
        } else {
          throw new Error()
        }
      } catch (error) {
        const endereco: Endereco = {
          mensagemErro: 'CEP inválido',
          statusErro: 400,
        }

        return endereco
      }
    }
  }
}

export default EnderecoController