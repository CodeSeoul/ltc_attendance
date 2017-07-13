const mongoose = require('mongoose')
const signInSchema = require('./checkin');

const sessionSchema = new mongoose.Schema({
  sessionOpen: { type: Boolean, default: true},
  date: { type: Date, default: Date.now },
  checkIns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'checkIn'
    }
  ],
  course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'course'
    }
});

const Session = mongoose.model('session', sessionSchema);

module.export = Session;
