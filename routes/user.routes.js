// route starts at "homepage/api/exercise/..."

const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers');

// test route
router.get('/', controllers.test);

// Create a new user
router.post('/new-user', controllers.createUser);

// Add exercise for a user
router.post('/add', controllers.addExercise);

// Get a user's log data
router.get('/log', controllers.getData);
  
module.exports = router;