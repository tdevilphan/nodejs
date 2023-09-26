import mongoose, { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

const User = mongoose.model(
  'User',
  new Schema({
    id: { type: Schema.ObjectId },
    name: {
      type: String,
      require: true,
      validate: {
        validator: (value) => value.length > 0
      },
      message: 'Name is required'
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
      type: Number
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

export default User
