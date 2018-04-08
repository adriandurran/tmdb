const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
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

User.plugin(passportLocalMongoose, { usernameField: 'email' });

mongoose.model('User', User);
