import { Schema, Document, Types, model } from 'mongoose'
import { Roles } from '../Configs/rolesList'

export interface Users extends Document<Types.ObjectId> {
  firstName: string
  lastName: string
  userName: string
  password: string
  roles: Roles
  refreshToken: string
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
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: {
      type: Number,
      default: 0,
    },
    Editor: {
      type: Number,
      default: 0,
    },
  },
  refreshToken: String,
})

export default model<Users>('User', UserSchema)
