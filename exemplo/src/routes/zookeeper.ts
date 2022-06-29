import { Router } from 'express'

import Species from '../entity/Species'
import ZookeeperController from '../controllers/ZookeeperController'
import Zookeeper from '../entity/Zookeeper'

export const zookeeperRouter = Router()
const zookeeperCtrl = new ZookeeperController()

zookeeperRouter.post('/', async (req, res) => {
  const {
    registrationCode,
    name,
    birthday,
    cages
  } = req.body

  if (registrationCode && name && birthday && cages) {
    const zookeeper = new Zookeeper()
    zookeeper.registrationCode = registrationCode
    zookeeper.name = name
    zookeeper.birthday = birthday
    zookeeper.cages = cages
        
    const savedZookeeper = await zookeeperCtrl.save(cages)

    return res.status(201).json({ specimen: savedZookeeper })
  }
    return res.status(400).json({ message: 'Bad request' })
})

zookeeperRouter.get('/', async (req, res) => {
  const zookeeper = await zookeeperCtrl.findAll()
  return res.json({ zookeeper })
})

zookeeperRouter.get('/:id', async (req, res) => {
  const aux = req.params.id
  const id = parseInt(aux)


zookeeperRouter.get('/species/:speciesId', async (req, res) => {
  const species = req.params.speciesId
  const speciesId = parseInt(species)
})

const specimen = await zookeeperCtrl.findById(id)

if (Zookeeper) {
  return res.json({ Zookeeper })
}

return res.status(404).json({ message: 'No species for given id' })
})

