import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import user from '@app/repositories/userRepository'

const login = async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    const { email, password } = req.body
    await user.login({ email, password })
    return res.send(`Hello, ${email}!`)
  }
  res.send({ errors: result.array() })
}

const register = async (req: Request, res: Response) => {
  const result = validationResult(req)
  const { name, email, password, address } = req.body
  await user.register({ name, email, password, address })
  return res.status(201).json(`Hello, ${name}!`)
}

export default {
  login,
  register
}
