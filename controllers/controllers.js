const shortid = require('shortid');
const User = require('../models/user.model');
const moment = require('moment');

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
    id: newShortId
  });

  // check if user already exists
  User.findOne({username: username})
    .then(data => {
      if (data !== null) {
        return res.send({message: 'Username already exists'});
      } 

      // save it and send response
      userDoc.save()
      .then(() => {
        return res.json({
          username,
          id: newShortId
        });
      });
    })
    .catch(err => {
      return res.send({message: err.message});
    });
};

// Add an exercise to a given user
exports.addExercise = (req, res) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date;
  let timeString

  if (!userId || !description || !duration) {
    return res.status(400).send('Fields marked with * are required');
  }

  if (!date) { 
    timeString = moment().format('dddd, MMM, Do YYYY');
  } else {
    const momentDate = moment(date, 'YYYY-MM-DD');
    if (!momentDate.isValid()) {
      return res.status(404).send('Date format needs to be "YYYY-MM-DD"'); 
    } else {
      timeString = momentDate.format('dddd, MMM, Do YYYY');
    }
  }

  const newExercise = {
    userId,
    description,
    duration,
    date: timeString
  };

  User.findOneAndUpdate({id: userId}, {$push: {logs: newExercise}}, {new: true})
  .then(user => {
    if (!user) {
        return res.status(404).send({
            message: `User not found with id ${userId}`
        });
    }
    return res.json(newExercise);
  })
  .catch(err => {
    return res.status(500).send({
      message: `Something went wrong updating product with id ${userId}`,
      error: err
    });
  });
};

// Get exercise log for user
exports.getData = (req, res) => {
  const userLog = req.query.params;
};
