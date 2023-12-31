const router = require('express').Router();
let Movie = require('../Models/Movie.Model');


router.route('/').get((req, res) => {
    Movie.find()
    .then(movies => res.json(movies))
    .catch(err => console.log('Error is: ', err))
})

router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        if (movie == null) res.json("This movie does not exist")
        else res.json(movie)
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const Name = req.body.Name;
    const ReleaseDate = Date.parse(req.body.ReleaseDate);

    const newMovie = new Movie({ Name, ReleaseDate });
    newMovie.save()
    .then(() => res.json('Movie Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))

})

router.route('/:id').put((req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        movie.Name = req.body.Name,

        movie.save()
        .then(() => res.json('Movie Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router;