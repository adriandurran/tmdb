const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('./user');

const courseSchema = new Schema({
  courseName: {
    required: true,
    type: String,
    trim: true
  },
  validity: {
    type: Number
  },
  type: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    trim: true
  },
  notes: [
    {
      noteDate: { type: Date },
      noteText: { type: String },
      noteBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
