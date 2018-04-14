const mongoose = require('mongoose');
const { Schema } = mongoose;

const compSchema = new Schema({
  compName: {
    required: true,
    type: String,
    trim: true
  },
  courseIds: Array
});

const Competency = mongoose.model('Competency', compSchema);

module.exports = Competency;
