const router = require('express').Router();
let Movie = require('../Models/Movie.Model');


router.route('/').get((req, res) => {
    Movie.find()
    .then(movies => res.json(movies))
    .catch(err => console.log('Error is: ', err))
})


router.route('/add').post((req, res) => {
    const Name = req.body.Name;
    const ReleaseDate = Date.parse(req.body.ReleaseDate);

    const newMovie = new Movie({ Name, ReleaseDate });
    newMovie.save()
    .then(() => res.json('Movie Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router;