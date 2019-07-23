const mongoose = require('mongoose');

const countries = require('../utils/countries-list');

const guestSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    date: {
        type: Date,
        default: Date.now
    },
    country: {
        type: String,
        enum: countries,
        required: true,
    }
});

module.exports = mongoose.model('Guest', guestSchema);