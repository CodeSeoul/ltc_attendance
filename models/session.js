const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  sessionOpen: { type: Boolean, default: true},
  date: { type: Date, default: Date.now },
  checkIns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'checkIn'
    }
  ],
  event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'event'
    }
});

const Session = mongoose.model('session', sessionSchema);

module.exports = Session;
