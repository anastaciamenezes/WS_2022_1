import { Request, Response, Router } from "express"
import * as EmailValidator from 'email-validator'

import UserController from "../controllers/UserController"
import { UserModel } from "../models/UserModel"

const userRouter = Router()
const userCTRL = new UserController()

userRouter.post('/,', async (req: Request, res: Response) => {
  const { name, email, birthday } = req.body

  let errorMessages: string[] = []
  if (!name) {
    errorMessages.push('Invaled name')
  }

  if (!EmailValidator.validate(email)) {
    errorMessages.push('Invalid e-mail')

  }
  if (birthday.match(/^\d{4}-\d{2}-\d{2}$/)){
    const birthdayObj = new Date(birthday)
  if (birthday > + new Date()) {
    errorMessages.push('Invalid birthday')
  }
} else {
  errorMessages.push('Invalid birthday')
}

  if (errorMessages.length == 0) {
    const user = new UserModel({
      name,
      email,
      birthday: new Date(birthday),

    }
    const savedUser = await userCTRL.save(user)
    return res.json({ savedUser })
    } else {

    return res.status(400).json({ errorMessages })

}
userRouter.get('/', )

