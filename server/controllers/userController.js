const User = require('../models/user');
const keys = require('../config/keys');
const arrayHelp = require('../utils/arrayHelpers');

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
      .populate({
        path: 'roles',
        populate: { path: 'competencies', populate: { path: 'courses' } }
      });
    res.send(dbUser);
  },

  editUserRole: async (req, res) => {
    const { role, action } = req.body;
    try {
      const thisUser = await User.findById(req.params.id);
      // get the array of roles from the user
      const roleSet = thisUser.roles;

      if (action) {
        arrayHelp.addToArray(roleSet, role);
      } else {
        arrayHelp.removeFromArray(roleSet, role);
      }

      const newRole = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { roles: roleSet }
        },
        { new: true }
      )
        .populate('courses')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: {
              path: 'courses'
            }
          }
        });
      return res.status(200).send(newRole);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
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

  currentUser: async (req, res) => {
    if (req.user === undefined) {
      res.send(req.user);
    } else {
      const currUser = await User.findById(req.user._id)
        .populate('courses')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: {
              path: 'courses'
            }
          }
        });
      res.send(currUser);
    }
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
