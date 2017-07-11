const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: [true, 'Email must be unique'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Email must be valid'
    }
  },
  level: { type: String, default: 'student' }
});

const User = mongoose.model('User', userSchema)

module.exports = User
