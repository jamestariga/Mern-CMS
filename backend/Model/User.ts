import { Schema, model } from 'mongoose'

interface User {
  firstName: string
  lastName: string
  password: string
}

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export default model<User>('User', UserSchema)
