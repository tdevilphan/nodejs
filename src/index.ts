import express from 'express'
import * as dotenv from 'dotenv'

import connect from './database/database'
import { userRoute } from '@app/routes/index'
import checkToken from './authentication/auth'

dotenv.config()

const app = express()
app.use(express.json())
app.use(checkToken)

const port = process.env.PORT || 3030
connect()
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
