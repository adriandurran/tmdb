const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = app => {
  // get the current user
  app.get('/auth/tmdb/current_user', async (req, res) => {
    res.send(req.user);
  });

  //   register new user
  app.post('/auth/tmdb/register', async (req, res) => {
    console.log(req.body);
    try {
      const { userId, firstName, lastName, email } = req.body.data.newUser;
      const newUser = await new User({
        email,
        userId,
        firstName,
        lastName
      }).save();
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/auth/tmdb/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });
};
