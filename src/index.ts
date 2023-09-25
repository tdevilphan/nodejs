import express from 'express'
import * as dotenv from 'dotenv'
import userRoute from './routes/user.ts'

dotenv.config()

const app = express()
const port = process.env.PORT || 3030

app.use(express.json())
app.use('user', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
