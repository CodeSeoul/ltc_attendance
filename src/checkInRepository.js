const CheckIn = require('../models/checkIn');
const userRepo = require('./userRepository');

module.exports = {

    createCheckIn(user, course, cb) {
        CheckIn.findOne({user: user.id, course: course.id}, (err, foundCheckIn) => {
            if (err) {
                const result = {err: err, res: foundCheckIn};
                cb(result);
            } else { // not checkin, let's checkin

                if (foundCheckIn !== null) { // checkin exists
                    console.log('already checked in');
                    console.log(foundCheckIn);
                    const result = {err: 'Already checked in', res: foundCheckIn};
                    cb(result);
                } else {
                    console.log('has not checked in. checking in');
                    const newCheckIn = new CheckIn({
                        user: user,
                        course: course
                    });
                    CheckIn.create(newCheckIn, (err, checkIn) => {
                        if (err) {
                            console.log(err);
                            const result = {err: err, res: checkIn};
                            cb(result);
                        } else {
                            user.checkIns.push(checkIn);
                            userRepo.updateUser(user.id, { $push: {checkIns: checkIn} }, (result) => {
                                if(result) {
                                    cb(checkIn);
                                } else {
                                    const output = {err: 'Failed to update user with checkIn', res: result};
                                    cb(output);
                                }
                            });
                        }
                    });
                }
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