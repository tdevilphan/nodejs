import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import UserRepository from '@app/repositories/UserRepository'
import { StatusCode } from '@app/common/constant'

const login = async (req: Request, res: Response) => {
  const result = validationResult(req)
  try {
    if (result.isEmpty()) {
      const { email, password } = req.body
      const user = await UserRepository.login({ email, password })
      return res.status(StatusCode.SUCCESS).json({ message: 'Login successfully', data: user })
    }
  } catch (error) {
    return res.status(StatusCode.BAD_REQUEST).json(error.toString())
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
    return res.status(StatusCode.BAD_REQUEST).json(error.toString())
  }
}

export default {
  login,
  register
}
