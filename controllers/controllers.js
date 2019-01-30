// Controllers for different routes
const shortid = require('shortid');

// send default test message
exports.test = (req, res) => {
  return res.json({ message: "This is a test" });
};

// Create a new user
exports.createUser = (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).send('You must enter a username');
  }
  
  const newShortId = shortid.generate();
  
  // make new user document
  const userModel = require('../models/user.model');
  const userDoc = new userModel({
    username,
    _id: newShortId
  });
  
  // save it and send response
  userDoc.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Something broke while creating the product"
      });
    });
};

// Add an exercise to a given user
exports.addExercise = (req, res) => {

};

// Get exercise log for user
exports.getData = (req, res) => {
  const userLog = req.query.params;
};