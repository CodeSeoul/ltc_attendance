const mongoose = require('mongoose');

const Course = mongoose.model('Course', {
  title: {type: String, required: true},
  description: String,
  tags: [String],
  createdAt: Date,
  createdBy: String
})

module.exports = Course
