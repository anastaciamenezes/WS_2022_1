import { Router } from 'express'

import EnderecoController from '../controllers/EnderecoController'
import Endereco from '../models/Endereco'

export const enderecoRouter = Router()
const enderecoCtrl = new EnderecoController()

enderecoRouter.get('/:cep', async (req, res) => {
  const { cep } = req.params

  const endereco: Endereco = await enderecoCtrl.findByCEP(cep)
  if (endereco.mensagemErro) {
    return res.status(endereco.statusErro || 400).json(endereco)
  }

  return res.json(endereco)
})