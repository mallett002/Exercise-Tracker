const User = require('../models/user.model');
let fromDateMS;

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

            // filter logs with {from} and {to} dates
            if (fromDate) {
                fromDateMS = new Date(fromDate).getTime();
                logs = logs.filter(keepGreaterThanOrEqual);
            }

            if (toDate) {
                // filter out those greater than toDate
            }

            if (limit) {
                // if numberItems > limit:
                    // pop off end while numberItems !== limit
                // else just return items
            }

            if (!logs.length) {
                return res.json({
                    message: `User with id ${userId} has no logs with given parameters`
                });
            }

            res.json({logs});

        })
        .catch(err => {
            res.status(500).send({
                error: err || `Something went wrong finding the user with id ${userId}`
            });
        });
};

function keepGreaterThanOrEqual(log) {
    let date = log.date;
    
    // remove "th" from "Wednesday, Feb, 6th 2019" bc new Date(dateString) doesn't work with 'th' or 'fth' in it
    const dateEndingRegex = /\d+(rd|th|st|nd)/; // capture the date number ending (eg. 'th' from '6th')
    const dateNumberRegex = /\d+/; // find date number (6)
    const match = date.match(dateEndingRegex); // see if 'th' exists or just 6 without 'th'
    const numberMatch = date.match(dateNumberRegex); // capture the number
    
    if (match) {
        date = date.replace(dateEndingRegex, numberMatch[0]);
    }
    
    // Turn Date Strings into ms since 1970
    const logDateMS = new Date(date).getTime();

    // Compare log date with fromDate
    return logDateMS >= fromDateMS
}