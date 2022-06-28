import { Document, Schema, model } from 'mongoose'

import { User } from './UserModel'

export interface Post extends Document {
  title: string
  content: string
  user: User | number
}
/**
 * usar o "user" para o relacionamento e referencia a coleção 'User'
 * 'User' valor que esta especificado no model
 * recebe um id
 */
const schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
})

/**
 * Validação do email
 */
export const validatePostInputs = (postObj: any) => {
  const { title, content, user } = postObj
  const errorMessages: string[] = []

  /**
   * Primeira validação TITULO obrigatório 
   */
  if (!title) {
    errorMessages.push('Invalid title')
  }

  /**
   * 
   */
  if (!content) {
    errorMessages.push('Invalid content')
  }

  if (!user) {
    errorMessages.push('No user associated to the post')
  }

  return errorMessages
}

export const PostModel = model('Post', schema)