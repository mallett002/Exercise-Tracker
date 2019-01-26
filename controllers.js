// Controllers for different routes

// send default test message
exports.test = (req, res) => {
  return res.json({ message: "This is a test" });
};

// Create a new user
exports.createUser = (req, res) => {

};

// Add an exercise to a given user
exports.addExercise = (req, res) => {

};

// Get exercise log for user
exports.getData = (req, res) => {
  const userLog = req.query.params;
};