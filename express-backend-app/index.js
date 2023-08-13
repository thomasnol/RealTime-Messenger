import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import sockets from './socket/sockets.js'
import mongoose from 'mongoose'
import path from 'path'
const __dirname = path.resolve()

const app = express()
const PORT = 4000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"]
  }
})


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', sockets)

/*
// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 9000
    httpServer.listen(PORT, () => {
        console.log(`App is listening on http://localhost:${PORT}`);
    })
}).catch(err => {
    console.log(err);
});
*/

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:4000`)
})
