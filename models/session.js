const mongoose = require('mongoose')
const signInSchema = require('./Signin');

const sessionSchema = new mongoose.Schema({
  sessionOpen: { type: Boolean, default: true},
  date: { type: Date, default: Date.now },
  signIns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'signIn'
    }
  ],
  course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course'
    }
});

const Session = mongoose.model('session', sessionSchema);

module.export = Session;
