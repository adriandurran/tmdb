const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseLevelSchema = new Schema({
  courseLevel: {
    type: String,
    trim: true,
    required: true
  }
});

const CourseLevel = mongoose.model('CourseLevel', courseLevelSchema);

module.exports = CourseLevel;
