const mongoose = require('mongoose');
const { Schema } = mopngoose;
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
  }
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
