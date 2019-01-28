const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// configure .env contents to go to process.env
const { error } = dotenv.config();
if (error) {
  throw error
}

// connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// import user routes
const user = require('./routes/user.routes');
// At '/api/exercise' use "user" routes
app.use('/api/exercise', user);

// Serve static files and serve HTML
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});
