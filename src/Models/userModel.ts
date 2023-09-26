import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
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
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\. [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email address.'
      ],
      unique: true,
      lowercase: true
    },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }
  })
)
