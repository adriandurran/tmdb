const mongoose = require('mongoose');
const { Schema } = mongoose;

const compTypeSchema = new Schema({
  compType: {
    required: true,
    type: String,
    trim: true
  }
});

const CompetencyType = mongoose.model('CompetencyType', compTypeSchema);

module.exports = CompetencyType;
