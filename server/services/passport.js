const passport = require('passport');
const mongoose = require('mongoose');
const CustomStrategy = require('passport-custom');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    // need to not return the password hash here.....
    done(null, user);
  });
});

passport.use(
  'tmdb',
  new CustomStrategy(async (req, done) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });

      if (
        !existingUser ||
        !existingUser.validPassword(existingUser, password)
      ) {
        return done(null, false);
      } else {
        return done(null, existingUser);
      }
    } catch (error) {
      return done(error);
    }
  })
);
