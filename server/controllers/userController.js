const User = require('../models/user');
const keys = require('../config/keys');
const arrayHelp = require('../utils/arrayHelpers');
const cloudinary = require('cloudinary');
const dataUri = require('datauri');
const path = require('path');

cloudinary.config({
  cloud_name: keys.cloudinary.cloud_name,
  api_key: keys.cloudinary.api_key,
  api_secret: keys.cloudinary.api_secret
});

module.exports = {
  allUsers: async (req, res) => {
    const dbAllUsers = await User.find({})
      .select({ passwordHash: 0 })
      .populate('department')
      .populate('courses._course')
      .populate({
        path: 'roles',
        populate: {
          path: 'competencies',
          populate: [{ path: 'courses' }, { path: 'compType' }]
        }
      });
    res.send(dbAllUsers);
  },

  getUser: async (req, res) => {
    const dbUser = await User.findOne(
      { _id: req.params.id },
      { passwordHash: 0 }
    )
      .populate('department')
      .populate('courses._course')
      .populate({
        path: 'roles',
        populate: {
          path: 'competencies',
          populate: [{ path: 'courses' }, { path: 'compType' }]
        }
      });
    res.send(dbUser);
  },

  verifyUserCourse: async (req, res) => {
    const { course } = req.body;
    try {
      const thisUser = await User.findOneAndUpdate(
        { _id: req.params.id, 'courses._id': course },
        { $set: { 'courses.$.verified': true } },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });
      return res.status(200).send(thisUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  addUserDept: async (req, res) => {
    try {
      const userDept = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });
      return res.send(userDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  addUserCourse: async (req, res) => {
    const { course } = req.body;
    try {
      const thisUser = await User.findById(req.params.id);
      const courseSet = [...thisUser.courses, course];
      // console.log(courseSet);
      const newCourse = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { courses: courseSet } },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });
      return res.status(200).send(newCourse);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
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
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
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
        {
          fields: { passwordHash: 0 },
          new: true
        }
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
        {
          fields: { passwordHash: 0 },
          new: true
        }
      );
      return res.status(200).send(adminiUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  updateUserProfile: async (req, res) => {
    const { username, userId, lastName, firstName } = req.body.profile;
    try {
      const newProf = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username,
            userId,
            firstName,
            lastName
          }
        },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });
      res.send(newProf);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  // temp I am using cloudinary whilst in dev mode.....if moved to
  // production this will need an seperate file store
  // but this would depend on the eventual location of the app
  addUserProfileImage: async (req, res) => {
    let dUri = new dataUri();
    try {
      dUri.format(
        path.extname(req.file.originalname).toString(),
        req.file.buffer
      );

      const cloudRes = await cloudinary.v2.uploader.upload(dUri.content, {
        folder: 'tmdb'
      });
      // update user with image url
      const imgUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { imageUrl: cloudRes.secure_url } },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });

      // return image user object
      res.send(imgUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  currentUser: async (req, res) => {
    if (req.user === undefined) {
      res.send(req.user);
    } else {
      const currUser = await User.findOne(
        { _id: req.user._id },
        { passwordHash: 0 }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
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
        password,
        verified,
        isAdmin,
        isSuperAdmin
      } = req.body.data.newUser;

      const joinDate = Date.now();
      let newUser = new User();

      let passwordHash = await newUser.generateHash(password);

      User.create({
        username,
        userId,
        firstName,
        lastName,
        passwordHash,
        joinDate,
        verified,
        isAdmin,
        isSuperAdmin
      })
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err));
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  resetPassword: async (req, res) => {
    const { password } = req.body;
    let restP = new User();

    try {
      const newP = await restP.generateHash(password.password);

      const resetP = await User.findByIdAndUpdate(
        req.params.id,
        { $set: { passwordHash: newP } },
        {
          fields: { passwordHash: 0 },
          new: true
        }
      )
        .populate('department')
        .populate('courses._course')
        .populate({
          path: 'roles',
          populate: {
            path: 'competencies',
            populate: [
              {
                path: 'courses'
              },
              { path: 'compType' }
            ]
          }
        });

      // return image user object
      res.send(resetP);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  loginUser: (req, res) => {
    res.send(req.user);
  },

  logoutUser: (req, res) => {
    req.logOut();

    req.session = null;
    res.clearCookie('tmdb', { path: '/' });
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
        verified,
        isAdmin,
        isSuperAdmin,
        passwordHash,
        joinDate: Date.now()
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
  },
  seedSuperAdminIT: async (req, res) => {
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
      } = keys.seedAdminIT;

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
        isSuperAdmin,
        joinDate: Date.now()
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
