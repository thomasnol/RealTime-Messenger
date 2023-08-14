import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import sockets from './socket/sockets.js'
import router from './api/routes.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT // should be 4000

// set up socket.io
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"]
  }
})

// uses /api/routes.js
app.use("/", router)

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  httpServer.listen(PORT, () => {
      console.log(`App is listening on http://localhost:${PORT}`);
  })
}).catch(err => {
  console.log(err);
});


io.on('connection', sockets)
