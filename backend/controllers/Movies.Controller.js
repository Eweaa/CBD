let Movie = require('../Models/Movie.Model');
let Actor = require('../Models/Actor.Model')
let jwt = require('jsonwebtoken');



const getMovies = async (req, res) => {

    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if (token == null) return res.sendStatus(401)
    // jwt.verify(token, process.env.SECRET as string)
    Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json(`Error: ${err}`))
}

const getMovie = async (req, res) => {

    Movie.findById(req.params.id)
    .then(movie => {
        if (movie == null) res.json('This movie does not exist');
        else 
        {
           Promise.all(movie.Actors.map(element => Actor.findById(element)))
           .then(actors => {
            movie.Actors = actors;
            res.json(movie);
           });
        }
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
}

const createMovie = async (req, res) => {
    const Name = req.body.Name;
    const ReleaseDate = Date.parse(req.body.ReleaseDate);

    const newMovie = new Movie({ Name, ReleaseDate });
    newMovie.save()
    .then(() => res.json('Movie Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}

const deleteMovie = async (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
}

const updateMovie = async (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        movie.Name = req.body.Name,

        movie.save()
        .then(() => res.json('Movie Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = { getMovies, getMovie, createMovie, deleteMovie, updateMovie };