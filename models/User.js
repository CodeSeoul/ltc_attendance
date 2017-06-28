const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  level: { type: String, default: 'student' },
})

const User = mongoose.model('User', userSchema)

module.exports = User
