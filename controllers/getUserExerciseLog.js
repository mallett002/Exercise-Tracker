const User = require('../models/user.model');

module.exports = (req, res) => {
    const userId = req.query.userId;
    return res.send(`User ID is ${userId}`);
};