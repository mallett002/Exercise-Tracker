const moment = require('moment');

function isDateValid(str) {
    const dateRegex = /\d{4}-\d{2}-\d{2}/;
    return str.match(dateRegex);
}
  
function generateNewTimeString(timeStamp) {
    const timestring = timeStamp 
    ? moment(timeStamp)._d.toString()
    : moment()._d.toString();
    const timeArray = timestring.split(' ').slice(0, 4);
    return timeArray.join(" ");
}

module.exports = {
    isDateValid,
    generateNewTimeString
};