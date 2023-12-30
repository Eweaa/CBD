const { default: mongoose, Schema } = require("mongoose");

const MovieSchema = new Schema({
    Name: { type: String, required: true, unique: false },
    ReleaseDate: { type: Date, required: true, unique: false }
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;

