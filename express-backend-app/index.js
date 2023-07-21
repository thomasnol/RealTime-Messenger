if (process.env.NODE_ENV !== 'production'){
    require('longjohn');
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

// cors middleware
const corsOptions = {
    origin: "https://mern-frontend-mccs.onrender.com" // frontend URI
}
app.use(express.json());
app.use(cors(corsOptions));

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`App is Listening on PORT ${PORT}`);
    })
}).catch(err => {
    console.log(err);
});


// const db = require('./db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const movieRouter = require('./routes/movie-router')

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
//app.use(bodyParser.json())

app.use('/api', movieRouter)

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.status(201).json({message: "Connected to Backend!"});
})

//const apiPort = 3000
//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
