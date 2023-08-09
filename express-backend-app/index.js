import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const PORT = 4000

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

import path from 'path'
const __dirname = path.resolve()

/*
import mongoose from 'mongoose'
// const bodyParser = require('body-parser')
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// cors middleware
const corsOptions = {
    //origin: "https://mern-frontend-jd6i.onrender.com" // frontend URI
    origin: "http://localhost:3000" // frontend URI
}
app.use(express.json());
app.use(cors(corsOptions));
*/

app.get('/', (req, res) => {
    //res.send('Hello World!')
    //res.status(201).json({message: "Testing"});
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('Connection is ready');
    socket.on('send-message', (data) => {
        socket.broadcast.emit('message-broadcast', data)
    })
    socket.on('start-typing', () => socket.broadcast.emit('start-typing-from-server'))
    socket.on('stop-typing', () => socket.broadcast.emit('stop-typing-from-server'))
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    })

    // socket.io rooms
    socket.on("join-room", ({roomId}) => {
        socket.join(roomId)
        console.log("joined room")
        // socket.to(roomId).emit("user-connected", socket.id)
    })

    // utility loggers for socket.io rooms
    // socket.on("create-room", (room) => console.log(`room ${room} was created`))
    // socket.on("delete-room", (room) => console.log(`room ${room} was deleted`))
    // socket.on("join-room", (room, id) => console.log(`socket ${id} joined room ${room}`))
    // socket.on("leave-room", (room, id) => console.log(`socket ${id} left room ${room}`))
})


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
    console.log(`Server listening on http://localhost:4000`);
})
