const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = require('./course');

const compSchema = new Schema({
  shortName: {
    required: true,
    type: String,
    trim: true
  },
  compName: {
    required: true,
    type: String,
    trim: true
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const Competency = mongoose.model('Competency', compSchema);

module.exports = Competency;
