const CheckIn = require('../models/checkIn');
const userRepo = require('./userRepository');

module.exports = {

    createCheckIn(user, course, cb) {
        CheckIn.findOne({user: user._id, course: course._id}, (err, foundCheckIn) => {
            if (err) {
                const result = {err: err, res: foundCheckIn};
                cb(result);
            } else if (foundCheckIn !== null) { // checkin exists
                console.log('already checked in');
                const result = {err: 'Already checked in', res: foundCheckIn};
                cb(result);
            } else { // not checkin, let's checkin
                console.log('has not checked in. checking in');
                const newCheckIn = new CheckIn({
                    user: user,
                    course: course
                });
                CheckIn.create(newCheckIn, (err, checkIn) => {
                    user.checkIns.push(checkIn);
                    userRepo.updateUser(user._id, user, (result) => {
                        if(result) {
                            cb(checkIn);
                        } else {
                            const output = {err: 'Failed to update user with checkIn', res: result};
                            cb(output);
                        }
                    });
                });
            }
        });
    },

    getCheckInByUserIdAndCourseId(userId, courseId, cb) {
        CheckIn.findOne({user: userId, course: courseId}, (err, checkIn) => {
            const result = {err: err, res: checkIn};
            cb(result);
        });
    },

};