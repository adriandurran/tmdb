const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  departmentCode: {
    required: true,
    type: String,
    trim: true,
    uppercase: true
  },
  departmentName: {
    required: true,
    type: String,
    trim: true
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
