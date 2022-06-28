import express from 'express'
import cors from 'cors'
import logger from 'morgan'

import { postRouter } from './routes/posts'
import { userRouter } from './routes/users'
import { connectToMongoDB } from './config/db'

const doDbConnection = async () => {
  await connectToMongoDB()
}

doDbConnection()

export const app = express()
app.use(express.json())
app.use(cors())
app.use(logger('dev'))

app.use('/users', userRouter)
app.use('/posts', postRouter)
app.get('/', (req, res) => res.send('MongoDB API Example'))