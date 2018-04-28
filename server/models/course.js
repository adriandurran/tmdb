const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  courseName: {
    required: true,
    type: String,
    trim: true
  },
  validity: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    trim: true
  }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
