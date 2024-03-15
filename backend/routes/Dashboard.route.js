const express = require('express');

const { getData } = require('../controllers/Dashboard.Controller');

const requireAuth  = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/', getData);

module.exports = router;