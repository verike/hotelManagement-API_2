import express, { Response } from "express"
import mongoose from "mongoose"

import rootRouter from "./routes/index.route"
import loginRouter from "./routes/login.route"
import RoomModel from './models/room.model'

mongoose.set('strictQuery', true)


// Getting access to the .env file for the database link
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI

// Creating a server
const app = express()

// Allows us to send and receive json files 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Access to all files
app.use('/api/v1', rootRouter)
app.use('/api/v1/login', loginRouter, async (res: Response) => {
    console.log('You are logged in');
    const rooms = await RoomModel.find().populate('roomtype')
    res.status(200).send({
        message: rooms
    })
})

// Connects to the database
mongoose.connect(MONGODB_URI!)
.then(() => console.log('Connected to database'))
.catch(err => console.log(err,':', err.message))

const port = process.env.PORT || 3000

// Server listening for requests
app.listen(port, () => console.log(`Server connected on port ${port}`))