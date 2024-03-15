let Actor = require('../Models/Actor.Model');

const getActors = async (req, res) => {
    Actor.find()
    .then(actors => res.json(actors))
    .catch(err => res.status(400).json(`Error: ${err}`))
}

const getActor = async (req, res) => {
    Actor.findById(req.params.id)
    .then(actor => {
        if (actor == null) res.json('This actor does not exist')
        else res.json(actor)
    })
    .catch(err => res.status(400).json(`Error: ${err}`))
}

const createActor = async (req, res) => {
    const Name = req.body.Name;
    const AddedOn = Date.now();

    const newActor = new Actor({ Name, AddedOn });
    newActor.save()
    .then(() => res.json('Actor Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
}

const deleteActor = async (req, res) => {
    Actor.findByIdAndDelete(req.params.id)
    .then(() => res.json('Actor Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
}

const updateActor = async (req, res) => {
    Actor.findById(req.params.id)
    .then(actor => {
        actor.Name = req.body.Name,

        actor.save()
        .then(() => res.json('Actor Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = { getActor, getActors, createActor, deleteActor, updateActor };