const CheckIn = require('../models/checkIn').CheckIn;

module.exports = {

    createCheckIn(user, event) {
        console.log('user:', user);
        console.log('event:', event);
        return new CheckIn()
            .save({
                user_id: user.get('id'),
                event_id: event.get('id')
            });
    },

    getCheckInByUserIdAndEventId(user, event) {
        return CheckIn.where({
            'user': user,
            'event': event
        }).fetch();
    },

};