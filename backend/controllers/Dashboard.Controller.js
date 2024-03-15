let Actor = require('../Models/Actor.Model');
let Movie = require('../Models/Movie.Model');

const getData = async (req, res) => {

    const actorPromise = new Promise((resolve, rej) => {
        Actor.find()
        .then(res =>{
            let actors = res.length;
            res = res.sort((x, y) => y.AddedOn - x.AddedOn);
            res = res.slice(0, 4);
            res = {
                last: res,
                length: actors
            }
            resolve(res)
        })
    });

    const moviePromise = new Promise((resolve, rej) => {
        Movie.find()
        .then(res => {
            resolve(res.length);
        })
    });


    Promise.all([actorPromise, moviePromise])
    .then(data => res.json(data));
    

    // Movie.find()
    // .then(m => res.json(m.length))
    // .catch(err => res.status(400).json(`Error: ${err}`));
}

module.exports = { getData };