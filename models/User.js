const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2 && name.length < 100,
      message: 'Name must be valid length'
    }
  },
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

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema)

module.exports = User
