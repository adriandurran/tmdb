const User = require('../models/user');
const keys = require('../config/keys');

module.exports = {
  allUsers: async (req, res) => {
    const dbAllUsers = await User.find({})
      .populate('courses')
      .populate('roles');
    res.send(dbAllUsers);
  },

  getUser: async (req, res) => {
    const dbUser = await User.findById(req.params.id)
      .populate('courses')
      .populate('roles');
    res.send(dbUser);
  },

  verifyUser: async (req, res) => {
    const { verify } = req.body;
    try {
      const veriUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { verified: verify }
        },
        { new: true }
      );
      return res.status(200).send(veriUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  adminUser: async (req, res) => {
    const { admin } = req.body;
    try {
      const adminiUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { isAdmin: admin } },
        { new: true }
      );
      return res.status(200).send(adminiUser);
    } catch (error) {
      console.log(error);
      console.log(error);
      return res.status(400).send(error);
    }
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
