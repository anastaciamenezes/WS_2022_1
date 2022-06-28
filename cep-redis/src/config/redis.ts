import { createClient } from 'redis'

export const clientRedis = createClient()
clientRedis.on('error', (error) => console.log(error))
clientRedis.connect().then(
  () => { console.log('App connected o Redis') },
  (error) => console.log(error)
)



process.on('SIGINT', () => {
  clientRedis.disconnect()
    console.log(`App disconnected to Redis`)
  
})
