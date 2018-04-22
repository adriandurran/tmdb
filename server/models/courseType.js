const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseTypeSchema = new Schema({
  courseType: {
    type: String,
    required: true,
    trim: true
  }
});

const CourseType = mongoose.model('CourseType', courseTypeSchema);
module.exports = CourseType;
