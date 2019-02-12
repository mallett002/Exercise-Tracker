const User = require('../models/user.model');

module.exports = (req, res) => {
    const userId = req.query.userId;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit = req.query.limit;

    if (!userId) {
        return res.status(404).send({
            message: 'Please provide a user ID'
        });
    }

    // Find user by userId
    User.findOne({id: userId})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User not found with id ${userId}`
                });
            }

            let logs = user.logs;

            if (!logs.length) {
                return res.json({
                    message: `User with id ${userId} has no exercises`
                });
            }

            let filteredLogs = logs
                .filter(({date}) => !fromDate || date >= fromDate) // now < past date
                .filter(({date}) => !toDate || date <= toDate);

            if (limit) {
                filteredLogs = filteredLogs.slice(0, limit);
            }

            if (!filteredLogs.length) {
                return res.json({
                    message: `User with id ${userId} has no logs with given parameters`
                });
            }

            res.json({filteredLogs});

        })
        .catch(err => {
            res.status(500).send({
                error: err || `Something went wrong finding the user with id ${userId}`
            });
        });
};