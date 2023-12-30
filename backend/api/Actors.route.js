const router = require('express').Router();
let Actor = require('../Models/Actor.Model');

router.route('/').get((req, res) => {
    Actor.find()
    .then(actors => res.json(actors))
    .catch(err => console.log('Error is: ', err))
})

router.route('/:id').get((req, res) => {
    Actor.findById(req.params.id)
    .then(actor => {
        if (actor == null) res.json("This actor does not exist")
        else res.json(actor)
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req, res) => {
    const Name = req.body.Name;

    const newActor = new Actor({ Name });
    newActor.save()
    .then(() => res.json('Actor Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Actor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Actor Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))

})

router.route('/:id').put((req, res) => {
    Actor.findById(req.params.id)
    .then(actor => {
        actor.Name = req.body.Name,

        actor.save()
        .then(() => res.json('Actor Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;