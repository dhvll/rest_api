import { omit } from 'lodash'
import {} from 'mongoose'
import UserModel, { UserInput } from '../models/user.model'

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input)
    return omit(user.toJSON(), 'password')
  } catch (e: any) {
    throw new Error(e)
  }
}
