import * as express from 'express'
import * as cors from 'cors'
import * as logger from 'morgan'
import userRouter from './routes/users'

/**
 * Cria um app do Express para gerenciar
 * rotas e endpoints
 */

export const app = express()

/**
 * Configura os middlewares do Express
 */

/**
 * O pacote cors libera o acesso aos nossos 
 * endpoints para outras aplicações.
 * Quando utilizamos a função do cors sem 
 * passar nenhum parametro, o acesso é liberado
 * para qualquer aplicação externa.
 */
app.use(cors())

/**
 * O pacote morgn faz com que o Express emita
 * logs mais detalhados durante a execução do app.
 * Utilizando como parametro a string 'dev', o
 * Express irá emitir logs de todas as requisições
 * realizadas no nosso server.
 */
app.use(logger('dev'))

/**
 * Habilita que os nossos endpoints possam interpretar
 * conteúdos de requisições em formato JSON
 */
app.use(express.json())

/**
 * GET / -> Devolve a string 'Olá!'
 */

app.get('/', (req, res) => res.send('Olá!'))

/**
 * Cria a rota de ususários na aplicação
 */

app.use('/users', userRouter)