const mongoose = require('mongoose');
const { Schema } = mongoose;

const Course = require('./course');
const CompetencyType = require('./competencyType');

const compSchema = new Schema({
  shortName: {
    required: true,
    type: String,
    trim: true,
    uppercase: true
  },
  compName: {
    required: true,
    type: String,
    trim: true
  },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  compType: { type: Schema.Types.ObjectId, ref: 'CompetencyType' }
});

const Competency = mongoose.model('Competency', compSchema);

module.exports = Competency;
