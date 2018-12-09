const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const Course = require('./course');
const Role = require('./role');
const Deptartment = require('./departments');

const saltRounds = 12;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  imageUrl: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isSuperAdmin: {
    type: Boolean,
    default: false
  },
  isManager: {
    type: Boolean,
    default: false
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  lineReport: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  courses: [
    {
      _course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      },
      passDate: { type: Date },
      verified: { type: Boolean, default: false }
    }
  ],
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  ojtHours: [{ type: Schema.Types.ObjectId, ref: 'OnJobTraining' }]
});

userSchema.methods.validPassword = async (user, password) => {
  const res = await bcrypt.compare(password, user.passwordHash);
  return res;
};

userSchema.methods.generateHash = async (password) => {
  const hashy = await bcrypt.hash(password, saltRounds);
  return hashy;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
