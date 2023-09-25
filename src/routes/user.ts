import express, { Router } from 'express'
import { body, validationResult } from 'express-validator'

const route: Router = express.Router()

route.get('/', (req, res) => {
  res.send('Get User')
})

route.post('/login', body('email').notEmpty().trim().isEmail(), (req, res) => {
  res.send('Post Login')
})

route.post('/register', (req, res) => {
  res.send('Post Register')
})

export default route
