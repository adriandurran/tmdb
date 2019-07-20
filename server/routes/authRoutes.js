const express = require('express');
const router = express.Router();

const passport = require('passport');
const userController = require('../controllers/userController');

// get the current user
router.get('/current_user', userController.currentUser);

// register new user
router.post('/register', userController.registerUser);

// login a user
router.post('/login', passport.authenticate('tmdb'), userController.loginUser);
// logout
router.get('/logout', userController.logoutUser);

// seed super admin this is for dev only............
// will change before putting into cloud
router.get('/start/seedadmin', userController.seedSuperAdmin);
router.get('/start/seedadminit', userController.seedSuperAdminIT);

module.exports = router;
