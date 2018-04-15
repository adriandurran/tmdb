const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseLevelSchema = new Schema({
  courseLevel: Array
});

const CourseLevel = mongoose.model('CourseLevel', courseLevelSchema);

module.exports = CourseLevel;
