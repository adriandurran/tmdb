const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackTypeSchema = new Schema({
  feedbackType: {
    type: String,
    required: true,
    trim: true
  }
});

const FeedBackType = mongoose.model('FeedBackType', feedbackTypeSchema);
module.exports = FeedBackType;
