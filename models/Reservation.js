const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter your name'
    },
    hotelName: {
        type: String,
        trim: true,
        required: 'Please enter a hotel name'
    },
    arrivalDate: {
        type: Date,
        default: Date.now,
        required: 'Please enter an arrival date (mm/dd/yyyy)'
    },
    departureDate: {
        type: Date,
        required: 'Please enter a departure date (mm/dd/yyyy)'
    },

});

module.exports = mongoose.model('Reservation', reservationSchema);

