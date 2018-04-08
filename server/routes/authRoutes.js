const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = app => {
  app.get('/auth/tmdb/current_user', async (req, res) => {
    res.send(req.user);
  });
};
