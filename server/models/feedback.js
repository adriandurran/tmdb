const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  feedbackUser: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  feedbackDate: {
    required: true,
    type: Date
  },
  feedbackType: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'FeedBackType'
  },
  feedbackNotes: {
    required: true,
    type: String,
    required: true
  },
  feedbackAppVersion: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'AppVersion'
  }
});

const FeedBack = mongoose.model('FeedBack', feedbackSchema);

module.exports = FeedBack;
