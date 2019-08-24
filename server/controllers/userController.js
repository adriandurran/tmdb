const User = require('../models/user');
const keys = require('../config/keys');
const arrayHelp = require('../utils/arrayHelpers');
const cloudinary = require('cloudinary');
const dataUri = require('datauri');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const addUserHistoryDept = async (user, dept, deptHistory) => {
  // add the dept and date
  const newDept = { _dept: dept.department, joinDate: Date.now() };

  const histDept = [...deptHistory, newDept];
  try {
    await User.findByIdAndUpdate(
      user,
      { $set: { deptHistory: histDept } },
      { fields: { passwordHash: 0 }, new: true }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addUserHistoryRole = async (user, role, roleHistory) => {
  const histRole = [...roleHistory, role];
  try {
    await User.findByIdAndUpdate(
      user,
      { $set: { roleHistory: histRole } },
      { fields: { passwordHash: 0 }, new: true }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  allUsers: async (req, res) => {
    const dbAllUsers = await User.find({})
      .select({ passwordHash: 0 })
      .populate('department')
      .populate('courses._course')
      .populate({
        path: 'roles._role',
        populate: {
          path: 'competencies',
          populate: [{ path: 'courses' }, { path: 'compType' }]
        }
      })
      .populate('deptHistory._dept')
      .populate('roleHistory._role');

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
        path: 'roles._role',
        populate: {
          path: 'competencies',
          populate: [{ path: 'courses' }, { path: 'compType' }]
        }
      })
      .populate('deptHistory._dept')
      .populate('roleHistory._role');

    // console.log('[dbUser]', dbUser);

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

      // add to the history
      await addUserHistoryDept(req.params.id, req.body, userDept.deptHistory);

      return res.send(userDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  addUserCourse: async (req, res) => {
    const { course } = req.body;
    console.log('course', course);
    try {
      const thisUser = await User.findById(req.params.id);
      const courseSet = [...thisUser.courses, course];
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
      let roleSet;
      if (!action) {
        roleSet = thisUser.roles.filter(
          (cRole) => cRole._role.toString() !== role.toString()
        );
      } else {
        roleSet = [...thisUser.roles, role];
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

      let histRole;

      if (action) {
        histRole = { _role: role._role, newRole: true };
      } else {
        histRole = { _role: role };
      }

      await addUserHistoryRole(req.params.id, histRole, thisUser.roleHistory);

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

  removeRegistration: async (req, res) => {
    try {
      const remReg = await User.deleteOne({ _id: req.params.id });
      return res.status(200).send(remReg);
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

      User.create({
        username,
        userId,
        firstName,
        lastName,
        passwordHash
      })
        .then((user) => res.status(200).send(user))
        .catch((err) => res.status(400).send(err));
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
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          console.log(err);
          return res.status(400).send(err);
        });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },
  seedSuperAdminIT: async () => {
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

      const adminITUser = await User.create({
        username,
        userId,
        firstName,
        lastName,
        passwordHash,
        verified,
        isAdmin,
        isSuperAdmin,
        joinDate: Date.now()
      });
      return adminITUser;
    } catch (error) {
      console.log(error);
    }
  }
};
