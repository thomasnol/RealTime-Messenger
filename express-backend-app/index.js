import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import sockets from './socket/sockets.js'
import mongoose from 'mongoose'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT // should be 4000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"]
  }
})

// await mongoose.connect
// 'mongodb://localhost:27017/chat-app'

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  httpServer.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`);
  })
}).catch(err => {
  console.log(err);
});

const __dirname = path.resolve()
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', sockets)

// httpServer.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:4000`)
// })
