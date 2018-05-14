const User = require('../models/user');
const keys = require('../config/keys');

module.exports = {
  allUsers: async (req, res) => {
    const dbAllUsers = await User.find({}).populate('courses');
    res.send(dbAllUsers);
  },

  currentUser: (req, res) => {
    res.send(req.user);
  },

  registerUser: async (req, res) => {
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
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err));
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  loginUser: (req, res) => {
    res.send(req.user);
  },

  logoutUser: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  seedSuperAdmin: async (req, res) => {
    try {
      const {
        userId,
        firstName,
        lastName,
        username,
        password,
        verified,
        isAdmin,
        isSuperAdmin
      } = keys.seedAdmin;

      let seedyA = new User();
      let passwordHash = await seedyA.generateHash(password);

      User.create({
        username,
        userId,
        firstName,
        lastName,
        passwordHash,
        verified,
        isAdmin,
        isSuperAdmin
      })
        .then(user => res.status(200).send(user))
        .catch(err => {
          console.log(err);
          return res.status(400).send(err);
        });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
};
