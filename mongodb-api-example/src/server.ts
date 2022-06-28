import { connection } from 'mongoose'

import { app } from "./app"
import { connectToMongoDB } from "./config/db"

const createServer = async () => {
  await connectToMongoDB()
  console.log('App connected to MongoDB')
  
  const PORT = 3000
  const server = app.listen(PORT, () =>
    console.log(`App listening to port ${PORT}`)
  )
  process.on('SINGINT', async () => {
    await connection.close()
    server.close()
    console.log('App server and connection to MongoDB closed')

  })
}

createServer()