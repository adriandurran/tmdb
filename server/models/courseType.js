const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseTypeSchema = new Schema({
  courseType: Array
});

const CourseType = mongoose.model('CourseType', courseTypeSchema);
module.exports = CourseType;
