const passport = require('passport');
const userController = require('../controllers/userController');

module.exports = app => {
  // get the current user
  app.get('/auth/tmdb/current_user', userController.currentUser);

  // register new user
  app.post('/auth/tmdb/register', userController.registerUser);

  // login a user
  app.post(
    '/auth/tmdb/login',
    passport.authenticate('tmdb'),
    userController.loginUser
  );
  // logout
  app.get('/auth/tmdb/logout', userController.logoutUser);

  // seed super admin this is for dev only............
  // will change before putting into cloud
  app.get('/auth/tmdb/start/seedadmin', userController.seedSuperAdmin);
};
