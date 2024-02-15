const express = require('express');

const { getMovies, getMovie, createMovie, deleteMovie, updateMovie } = require('../controllers/Movies.Controller');

const requireAuth  = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getMovies);

router.get('/:id', getMovie);

router.post('/', createMovie);

router.delete('/:id', deleteMovie);

router.put('/:id', updateMovie);

module.exports = router;