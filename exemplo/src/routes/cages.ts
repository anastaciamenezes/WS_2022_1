import { Router } from 'express'
import CagesController from '../controllers/CagesController'
import Cage from '../entity/Cage'
import Species from '../entity/Species'

export const cagesRouter = Router()
const cagesCtrl = new CagesController()

cagesRouter.post('/', async (req, res) => {
  const { code, area, zookeepers } = req.body

  if (code && area && zookeepers) {
    const cages = new Cage()
    cages.code = code
    cages.area = area
    cages.zookeepers = zookeepers

    const savedCages = await cagesCtrl.save(Species)
    return res.status(201).json({ cages: savedCages })
  }

  return res.status(400).json({ message: 'Bad request' })
})

cagesRouter.get('/', async (req, res) => {
  const cages = await cagesCtrl.findAll()
  return res.json({ cages })
})

cagesRouter.get('/:id', async (req, res) => {
  const aux = req.params.id
  const id = parseInt(aux)

cagesRouter.get('/zookeepers/:zookeeperRegistrationCode',async (req, res) => {
  const zookeepers = req.params.zookeeperRegistrationCode
  const zookeeperRegistrationCode = String(zookeepers)
})

  const cages = await cagesCtrl.findById(id)

if (Cage) {
    return res.json({ Cage })
  }

  return res.status(404).json({ message: 'No species for given id' })
})