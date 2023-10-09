import express from 'express'
import http from 'http'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'

import connect from './database/database'
import { userRoute } from '@app/routes/index'
import checkToken from './authentication/auth'

dotenv.config()

const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(cors({ origin: true }))
app.use(checkToken)

const port = process.env.PORT || 3002
const socketPort = process.env.PORT_SOCKET || 4000

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// Listen for when the client connects via socket.io-client
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)

  // Socket event listeners in here...
})
server.listen(socketPort, () => console.log(`Server is running on port ${socketPort}`))

connect()
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
