const shortid = require('shortid');
const User = require('../models/user.model');
const moment = require('moment');

module.exports = (req, res) => {
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