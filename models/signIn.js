const mongoose = require('mongoose')

const signInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course'
  },
  date: { type: Date, default: Date.now }
});

const SignIn = mongoose.model('signIn', signInSchema);

module.export = SignIn;
