const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
  }
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
