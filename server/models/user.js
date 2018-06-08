const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const Course = require('./course');
const Role = require('./role');

const saltRounds = 10;

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
  joinDate: {
    type: Date
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
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
});

userSchema.methods.validPassword = async (user, password) => {
  const res = await bcrypt.compare(password, user.passwordHash);
  return res;
};

userSchema.methods.generateHash = async password => {
  const hashy = await bcrypt.hash(password, saltRounds);
  return hashy;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
