const passport = require('passport');
const User = require('../models/user');
// i hate bycript
module.exports = app => {
  // get the current user
  app.get('/auth/tmdb/current_user', async (req, res) => {
    res.send(req.user);
  });

  // register new user
  app.post('/auth/tmdb/register', async (req, res) => {
    try {
      const {
        userId,
        firstName,
        lastName,
        username,
        password
      } = req.body.data.newUser;

      let newUser = new User();

      let passwordHash = await newUser.generateHash(password);

      User.create({ username, userId, firstName, lastName, passwordHash })
        .then(user => console.log('newuser', user))
        .catch(err => console.log('error', err));
    } catch (error) {
      console.log(error);
    }
  });

  // login a user
  app.post('/auth/tmdb/login', passport.authenticate('tmdb'), (req, res) => {
    res.send(req.user);
  });
  // logout
  app.get('/auth/tmdb/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
