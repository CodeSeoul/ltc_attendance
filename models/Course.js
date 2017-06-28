const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
  title: {type: String, required: true},
  description: String
})

module.exports = Course
