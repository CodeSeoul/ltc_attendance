const CheckIn = require('../models/checkIn').CheckIn;
const userRepo = require('./userRepository');

module.exports = {

    createCheckIn(user, event) {
        return new CheckIn()
            .save({
                user: user,
                event: event
            });
    },

    getCheckInByUserIdAndEventId(user, event) {
        return CheckIn.where({
            'user': user,
            'event': event
        });
    },

};