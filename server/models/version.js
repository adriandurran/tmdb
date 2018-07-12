const mongoose = require('mongoose');
const { Schema } = mongoose;

const versionSchema = new Schema({
  versionNumber: {
    required: true,
    type: String
  },
  versionDate: {
    required: true,
    type: Date
  },
  versionNotes: {
    type: String
  }
});

const AppVersion = mongoose.model('AppVersion', versionSchema);

module.exports = AppVersion;
