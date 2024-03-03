const { default: mongoose, Schema } = require("mongoose");

const ActorSchema = new Schema({
    Name: { type: String, required: true, unique: false },
    Img: { type: String, required: false, unique: true },
})

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;

