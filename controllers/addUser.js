const shortid = require('shortid');
const User = require('../models/user.model');

module.exports = (req, res) => {
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