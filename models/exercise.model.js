const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exersiceSchema = new Schema({
    _id: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', exersiceSchema);