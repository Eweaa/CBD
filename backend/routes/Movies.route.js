const express = require('express');

const { getMovies, getMovie, createMovie, deleteMovie, updateMovie } = require('../controllers/Movies.Controller');

const router = express.Router();

router.get('/', getMovies);

router.get('/:id', getMovie);

router.post('/', createMovie);

router.delete('/:id', deleteMovie);

router.put('/:id', updateMovie);

module.exports = router;