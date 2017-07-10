const mongoose = require('mongoose')
const UserSchema = require('./user');

const sessionSchema = new mongoose.Schema({
  sessionOpen: { type: Boolean, default: true},
  date: { type: Date, default: Date.now },
  users: [UserSchema],
  users: String,
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
});

const Session = mongoose.model('Session', sessionSchema);

module.export = Session;
