const express = require('express');

const { getActors, getActor, createActor, deleteActor, updateActor } = require('../controllers/Actors.Controller');

const router = express.Router();

router.get('/', getActors);

router.get('/:id', getActor);

router.post('/', createActor);

router.delete('/:id', deleteActor);

router.put('/:id', updateActor);

module.exports = router;