const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true, unique: false }
})

const User = mongoose.model('User', userSchema);

module.exports = User;