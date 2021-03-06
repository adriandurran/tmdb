const passport = require('passport');
// const mongoose = require('mongoose');
const CustomStrategy = require('passport-custom');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, { passwordHash: 0 }).then((user) => {
    done(null, user);
  });
});

passport.use(
  'tmdb',
  new CustomStrategy(async (req, done) => {
    const { username, password } = req.body;
    const newLog = new User();
    try {
      const existingUser = await User.findOne({ username })
        .populate('department.dept')
        .populate('courses._course')
        .populate({
          path: 'roles._role',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        })
        .populate('deptHistory._dept')
        .populate('roleHistory._role');

      if (!existingUser) {
        console.log('no user found');
        return done(null, false);
      }

      if (existingUser) {
        const passwordGood = await existingUser.validPassword(
          existingUser,
          password
        );
        if (!passwordGood) {
          return done(null, false);
        } else {
          return done(null, existingUser);
        }
      }
    } catch (error) {
      return done(error);
    }
  })
);
