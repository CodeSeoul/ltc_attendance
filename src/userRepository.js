const User = require('../models/User');
const CheckIn = require('../models/checkIn');

module.exports = {
    getUsers(cb) {
        User.find({}).sort({checkIns: -1}).exec((err, users) => {
            if (err) return console.log(err);
            cb(users);
        });
    },

    createUser(reqBody, cb) {
        const newCheckIn = new CheckIn({
            user: reqBody._id,
            course: reqBody.courseId
        });
        const user = {
            username: reqBody.username,
            email: reqBody.email,
            password: reqBody.password,
            checkIns: [newCheckIn]
        };
        User.create(user, (err, user) => {
            const result = {err: err, res: user};
            cb(result);
        });
    },

    getUser(id, cb) {
        User.findById(id, (err, user) => {
            if (err) return console.log(err);
            cb(user);
        });
    },

    getUserByEmail(email, cb) {
        User.findOne({email: email}, (err, user) => {
            if (err) return console.log(err);
            cb(user);
        });
    },

    getUserByUsername(name, cb) {
        User.findOne({username: name}, (err, user) => {
            if (err) return console.log(err);
            cb(user);
        });
    },

    updateUser(id, user, cb) {
        User.findByIdAndUpdate(id, user, (err, result) => {
            if (err) return console.log(err);
            cb(result);
        });
    },

    deleteUser(id, cb) {
        User.findByIdAndRemove(id, (err, result) => {
            if (err) return console.log(err);
            cb(result);
        });
    }

};
