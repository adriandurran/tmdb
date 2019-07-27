const mongoose = require('mongoose');
const { Schema } = mongoose;

const userHistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  depts: [
    {
      _dept: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
      },
      joinDate: { type: Date }
    }
  ],
  roles: [
    {
      _role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
      },
      joinDate: { type: Date }
    }
  ]
});

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

module.exports = UserHistory;
