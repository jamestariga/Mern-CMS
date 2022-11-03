import { Schema, Document, Types, model } from 'mongoose'

export interface Users extends Document<Types.ObjectId> {
  firstName: string
  lastName: string
}

const UserSchema = new Schema<Users>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

export default model<Users>('User', UserSchema)
