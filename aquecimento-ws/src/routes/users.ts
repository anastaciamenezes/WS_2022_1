import { Router } from 'express'
import UserController from '../controllers/UserController'
import User from '../models/entities/User'

const userRouter = Router()
const userCtrl = new UserController()

userRouter.post('/', (req, res) => {
  const { id, name, email } = req.body
  const user: User = { id, name, email }
  userCtrl.save(user)
  res.json({ message: 'User saved' })
})

userRouter.get('/', (req, res) => {
  const users = userCtrl.getAll()
  res.json({ users })
})

export default userRouter