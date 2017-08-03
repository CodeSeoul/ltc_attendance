const mongoose = require('mongoose')
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
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
  level: { 
    type: String, 
    default: 'student',
    enum: ['student', 'instructor', 'admin']
  },
  hometown: {
    type: String,
    default: 'hometown',
    validate: {
      validator: (hometown) => hometown.length > 2 && hometown.length < 100,
      message: 'Hometown must be valid length'
    }
  },
  website: { 
    type: String,
    validate: {
      validator: (website) => validator.isURL(website),
      message: 'Website must be valid'
    }
  },
  checkIns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'checkIn'
    }
  ]
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('user', userSchema)

module.exports = User;
