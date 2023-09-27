import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '@app/Models'

const login = async ({ email, password }) => {
  const existingUser = await User.findOne({ email }).exec()
  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if (isMatch) {
      //Create JWT
      const token = jwt.sign(
        {
          data: existingUser
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: '30 days'
        }
      )

      const user = { ...existingUser.toObject() }
      delete user.password
      return {
        ...user,
        token
      }
    } else {
      throw new Error('Wrong email or password!')
    }
  } else {
    throw new Error('Wrong email or password!')
  }
}

const register = async ({ name, email, password, address, phone, languages, gender }) => {
  try {
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      throw new Error('User already exist!')
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      name,
      email,
      address,
      phone,
      languages,
      gender,
      password: hashedPassword
    })
    if (newUser) {
      const newResponse = { ...newUser.toObject() }
      return delete newResponse.password
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default {
  login,
  register
}
