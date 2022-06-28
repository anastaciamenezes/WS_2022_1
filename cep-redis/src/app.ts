import express from 'express'
import cors from 'cors'
import logger from 'morgan'

import './config/redis'
import { enderecoRouter } from './routes/enderecos'

export const app = express()

app.use(cors())

app.use(logger('dev'))

app.use(express.json())

app.use('/enderecos', enderecoRouter)

app.use('/', (req, res) => res.send('API cep-redis'))