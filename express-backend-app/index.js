
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer)
io.on('connection', (socket) => {
    console.log('connection is ready');
})

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

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 9000
    httpServer.listen(PORT, () => {
        console.log(`App is listening on http://localhost:${PORT}`);
    })
}).catch(err => {
    console.log(err);
});


app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.status(201).json({message: "Testing"});
})
