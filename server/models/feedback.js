const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  feedBackUser: {
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
    type: String,
    required: true
  }
});

const FeedBack = mongoose.model('FeedBack', feedbackSchema);

module.exports = FeedBack;
