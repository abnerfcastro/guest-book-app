const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

function onMongooseConnectionError(err) {
    if (err) console.error(err);
    else console.log('Connected to Mongo database');
}

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, onMongooseConnectionError);

const app = express();

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Bring in the guests routes
const guestsRoutes = require('./routes/guests');

app.use('/guests', guestsRoutes);

module.exports = app;