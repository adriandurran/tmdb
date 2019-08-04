const mongoose = require('mongoose');
const { Schema } = mongoose;

const ojtTypeSchema = new Schema({
  ojtType: {
    required: true,
    type: String,
    trim: true
  }
});

const OJTType = mongoose.model('OJTType', ojtTypeSchema);

module.exports = OJTType;
