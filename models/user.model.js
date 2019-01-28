const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exersiceSchema = new Schema({
    _id: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    username: { type: String, required: true },
    _id: { type: String, required: true },
    exercises: [ exerciseSchema ]
});


// Export the model
module.exports = mongoose.model('User', userSchema);