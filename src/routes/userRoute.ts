import express, { Router } from 'express'
import { body } from 'express-validator'

import { UserController } from '@app/controllers'

const userRoute: Router = express.Router()

userRoute.use((req, res, next) => {
  next()
})

userRoute.get('/', (req, res) => {
  res.send('Get User')
})

userRoute.post('/login', body('email').notEmpty().trim().isEmail(), UserController.login)

userRoute.post('/register', UserController.register)

export default userRoute
