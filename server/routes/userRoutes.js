const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/userController');

router.patch('/:id', requireLogin, userController.updateUserProfile);
router.post('/:id/image', requireLogin, userController.addUserProfileImage);

router.get('/image/:imageId', requireLogin, userController.getUserProfileImage);

router.get('/admin/allusers', requireAdmin, userController.allUsers);
router.patch(
  '/admin/users/:id/verify',
  requireAdmin,
  userController.verifyUser
);
router.patch('/admin/users/:id/admin', requireAdmin, userController.adminUser);

router.get('/admin/users/:id', requireAdmin, userController.getUser);
router.patch(
  '/admin/users/:id/roles',
  requireAdmin,
  userController.editUserRole
);
// add user dept
router.patch(
  '/admin/users/:id/department',
  requireAdmin,
  userController.addUserDept
);

// add user course
router.patch('/:id/course', requireLogin, userController.addUserCourse);

// verify a user course
router.patch(
  '/:id/verify-course',
  requireAdmin,
  userController.verifyUserCourse
);

module.exports = router;
