// Controllers for different routes
const shortid = require('shortid');

// send default test message
exports.test = (req, res) => {
  return res.json({ message: "This is a test" });
};

// Create a new user
exports.createUser = (req, res) => {
  // post a username
  // return object with username and id (from shortid);
  // {
  //   "username": "tony",
  //   "_id": "SyDl2g5XN"
  // }
  
  // get username
  const username = req.body.username;
  
  // generate shortid
  const newShortId = shortid.generate();
  
  // make new document for it
  
  // save to db
  
  // send response
  return res.json({
    username,
    _id: newShortId
  });
};

// Add an exercise to a given user
exports.addExercise = (req, res) => {

};

// Get exercise log for user
exports.getData = (req, res) => {
  const userLog = req.query.params;
};