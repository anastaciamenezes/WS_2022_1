import { Document , Schema, model } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  birthday: Date
}


const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthday: {type: Date, required: true},
})

export const UserModel = model<User>('User', schema)
