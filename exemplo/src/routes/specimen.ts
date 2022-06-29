import { Router } from 'express'

import SpecimenController from '../controllers/SpeciesController'
import Specimen from '../entity/Specimen'
import Species from '../entity/Species'

export const specimenRouter = Router()
const specimenCtrl = new SpecimenController()

specimenRouter.post('/', async (req, res) => {
  const {
    id,
    serialNumber,
    nickName,
    species,
    cage,
    zookeeper,
  } = req.body

  if (id && serialNumber && nickName && species && cage && zookeeper) {
    const specimen = new Specimen()
    specimen.id = id
    specimen.serialNumber = serialNumber
    specimen.nickName = nickName
    specimen.species = species
    specimen.cage = cage
    specimen.zookeeper = zookeeper
    
    const savedSpecimen = await specimenCtrl.save(Species)

    return res.status(201).json({ specimen: savedSpecimen })
  }
    return res.status(400).json({ message: 'Bad request' })
})

specimenRouter.get('/', async (req, res) => {
  const cages = await specimenCtrl.findAll()
  return res.json({ cages })
})

specimenRouter.get('/:id', async (req, res) => {
  const aux = req.params.id
  const id = parseInt(aux)


specimenRouter.get('/species/:speciesId', async (req, res) => {
  const species = req.params.speciesId
  const speciesId = parseInt(species)
})

specimenRouter.get('/cage/:cageCode', async (req, res) => {
  const cage = req.params.cageCode
  const cageCode = String(cage)
})

specimenRouter.get('/:zookeeperRegistrationCode', async (req, res) => {
  const zookeeper = req.params.zookeeperRegistrationCode
  const zookeeperRegistrationCode = String(zookeeper)
})

const specimen = await specimenCtrl.findById(id)

if (Specimen) {
  return res.json({ Specimen })
}

return res.status(404).json({ message: 'No species for given id' })
})

