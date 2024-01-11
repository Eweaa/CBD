const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
// import Movies from "./api/Movies.route.js";
// import Actors from "./api/Actors.route.js";
// import dotenv from "dotenv";
// import mongodb from "mongodb";
// import connectDB from './config/db.js'


// dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const MongoClient = mongodb.MongoClient;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;


mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`MongoDB database connection esatblished successfully`);
})

const actorRouter = require('./routes/Actors.route')
const movieRouter = require('./routes/Movies.route')
const userRouter = require('./routes/User.route')

app.use('/actors', actorRouter)
app.use('/movies', movieRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// MongoClient.connect(uri).then(() =>{
//     app.listen(port, () => console.log(`listening to port ${port}`))
//     app.use("/actors", Actors)
//     app.use("*", (req, res) => res.status(404).json({ error: "Not Found"}));
// })

// app.use("/cbd/movies", Movies)


