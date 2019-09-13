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
  },
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
