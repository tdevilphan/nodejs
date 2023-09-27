import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import UserRepository from '@app/repositories/UserRepository'

const login = async (req: Request, res: Response) => {
  const result = validationResult(req)
  try {
    if (result.isEmpty()) {
      const { email, password } = req.body
      const user = await UserRepository.login({ email, password })
      return res.status(200).json({ message: 'Login successfully', data: user })
    }
  } catch (error) {
    return res.status(400).json(error.toString())
  }
  res.send({ errors: result.array() })
}

const register = async (req: Request, res: Response) => {
  const { name, email, password, address, phone, languages, gender } = req.body
  try {
    const newUser = await UserRepository.register({ name, email, password, address, phone, languages, gender })
    if (newUser) {
      return res.status(200).json({
        message: 'Register user successfully',
        data: newUser
      })
    }
  } catch (error) {
    return res.status(400).json(error.toString())
  }
}

export default {
  login,
  register
}
