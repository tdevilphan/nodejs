import mongoose, { Schema, Document } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

export interface UserDef {
  id: typeof Schema.ObjectId
  name: string
  email: string
  password: string
  phone?: string
  address?: string
  languages?: [string]
  gender?: 'Male' | 'Female'
}

const User = mongoose.model(
  'User',
  new Schema<UserDef>({
    id: { type: Schema.ObjectId },
    name: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 0,
        message: 'Name is required'
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => isEmail,
        message: 'Email is incorrect format!'
      }
    },
    password: {
      type: String,
      require: true
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    languages: {
      type: [String]
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not support'
      }
    }
  })
)

export type UserDocument = Document<unknown, any, UserDef> & UserDef

export default User
