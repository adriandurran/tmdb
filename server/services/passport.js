const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.serializeUser(User.serializeUser);

passport.deserializeUser(User.deserializeUser);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (req, username, password, done) => {
      try {
        const existingUser = await User.findOne({ email: username });
        if (existingUser) {
          return done(null, existingUser);
        } else {
          //   const { userId, firstName, lastName, email } = req.body.data;
          //   const newUser = await new User({
          //     email,
          //     userId,
          //     firstName,
          //     lastName
          //   }).save();
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
