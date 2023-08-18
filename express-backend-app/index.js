import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import path from 'path'
import sockets from './socket/sockets.js'
import router from './api/routes.js'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT // should be 4000

// set up socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["https://realtime-messaging-app.onrender.com"]
  }
})

const __dirname = path.resolve()

app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.use("/", router) // uses /api/routes.js

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  httpServer.listen(PORT, () => {
      // console.log(`App is listening on http://localhost:${PORT}`);
      console.log(`App is listening on https://mern-webapp-9f68.onrender.com:${PORT}`);
  })
}).catch(err => {
  console.log(`Error: ${err}`);
});


io.on('connection', sockets)
