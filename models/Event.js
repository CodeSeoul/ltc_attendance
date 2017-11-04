const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    validate: {
      validator: (title) => title.length > 1 && title.length < 100,
      message: 'Title must be valid length'
    }
  },
  type: {
    type: String
  },
  description: {
    type: String,
    validate: {
      validator: (description) =>
      description.length > 2 && description.length < 10000,
      message: 'Description must be valid length'
    }
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

const Event = mongoose.model('event', eventSchema)

module.exports = Event
