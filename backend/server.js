const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
const dashboardRouter = require('./routes/Dashboard.route')

app.use('/actors', actorRouter)
app.use('/movies', movieRouter)
app.use('/user', userRouter)
app.use('/dashboard', dashboardRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});