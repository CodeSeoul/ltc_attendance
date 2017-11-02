const mongoose = require('mongoose')

const checkInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  },
  date: { type: Date, default: Date.now }
});

const CheckIn = mongoose.model('checkIn', checkInSchema);

module.exports = CheckIn;
