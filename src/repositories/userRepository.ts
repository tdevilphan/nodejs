import { User } from '@app/models'
import bcrypt from 'bcrypt'

const login = async ({ email, password }) => {
  console.log(`Logged in ${email}`)
}

const register = async ({ name, email, password }) => {
  try {
    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      throw new Error('User already exist!')
    }
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUND)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })
    if (newUser) {
      const { password, ...responseUser } = newUser._doc
    }
    return newUser
  } catch (error) {
    throw new Error('Cannot register user')
  }
}

export default {
  login,
  register
}
