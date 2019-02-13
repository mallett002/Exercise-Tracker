const User = require('../models/user.model');
const moment = require('moment');

module.exports = (req, res) => {
    const userId = req.query.userId;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    let fromDateInfo = fromDate ? moment(fromDate, 'YYYY-MM-DD') : null;
    let toDateInfo = toDate ? moment(toDate, 'YYYY-MM-DD') : null;
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
                .filter(({dateInfo}) => !fromDate || dateInfo >= fromDateInfo) 
                .filter(({dateInfo}) => !toDate || dateInfo <= toDateInfo)
                .sort((a, b) => a.dateInfo > b.dateInfo ? -1 : 1);
                
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