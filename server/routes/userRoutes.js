const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/userController');

router.put('/:id', requireLogin, userController.updateUserProfile);

router.delete(
  '/admin/users/:id',
  requireAdmin,
  userController.removeRegistration
);
router.post(
  '/:id/image',
  upload.single('userImage'),
  requireLogin,
  userController.addUserProfileImage
);
router.post('/:id/password/reset', requireLogin, userController.resetPassword);

router.get('/admin/allusers', requireAdmin, userController.allUsers);
router.put('/admin/users/:id/verify', requireAdmin, userController.verifyUser);
router.put('/admin/users/:id/admin', requireAdmin, userController.adminUser);

router.get('/admin/users/:id', requireAdmin, userController.getUser);
router.delete(
  '/admin/users/:id',
  requireAdmin,
  userController.removeRegistration
);
router.put('/admin/users/:id/roles', requireAdmin, userController.editUserRole);
// add user dept
router.put(
  '/admin/users/:id/department',
  requireAdmin,
  userController.addUserDept
);

// add user course
router.put('/:id/course', requireLogin, userController.addUserCourse);

// verify a user course
router.put('/:id/verify-course', requireAdmin, userController.verifyUserCourse);

// admin add a new user
router.put('/admin/user/newuser', requireAdmin, userController.adminNewUser);

module.exports = router;
