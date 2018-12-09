const mongoose = require('mongoose');
const { Schema } = mongoose;

const ojtSchema = new Schema({
  ojtName: {
    required: true,
    type: String,
    trim: true
  },
  ojtType: {
    type: String,
    trim: true
  },
  hours: {
    type: Number,
    required: true,
    default: 0
  }
});

const OnJobTraining = mongoose.model('OnJobTraining', ojtSchema);

module.exports = OnJobTraining;
