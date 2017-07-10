const User = require('../models/User');

module.exports = {

  getUsers(cb) {
    User.find({}, (err, users) => {
      if (err) return console.log(err);
      cb(users);
    });
  },

  createUser(user, cb) {
    User.create(user, (err, user) => {
      let result = {
        err: err,
        res: user
      }
      cb(result);
    });
  },

  getUser(id, cb) {
    User.findById(id, (err, user) => {
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

}
