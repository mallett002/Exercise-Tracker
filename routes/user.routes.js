// route starts at "homepage/api/exercise/..."

const express = require('express');
const router = express.Router();
const addUser = require('../controllers/addUser');
const addExercise = require('../controllers/addExercise');
const getUserExerciseLog = require('../controllers/getUserExerciseLog');

// Create a new user
router.post('/new-user', addUser);

// Add exercise for a user
router.post('/add', addExercise);

// Get a user's log data
router.get('/log', getUserExerciseLog);
  
module.exports = router;