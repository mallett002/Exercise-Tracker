const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
    dateInfo: { type: Number, required: true }
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    logs: [exerciseSchema] // defaults to empty array & required: false
});

module.exports = mongoose.model('User', userSchema);