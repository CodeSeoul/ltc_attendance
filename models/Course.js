const mongoose = require('mongoose');

const TagSchema = mongoose.Schema({
  title: String
});

const Course = mongoose.model('Course', {
  title: {
    type: String, 
    required: [true, 'Title is required'],
    validate: {
      validator: (title) => title.length > 1 && title.length < 100,
      message: 'Title must be valid length'
    }
  },
  description: {
    type: String, 
    validate: {
      validator: (description) => 
      description.length > 2 && description.length < 10000,
      message: 'Description must be valid length'
    }
  },
  tags: [TagSchema],
  createdAt: { type: Date, default: Date.now },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
})

module.exports = Course
