const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/userController');

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

router.patch('/:id/course', requireLogin, userController.addUserCourse);

module.exports = router;
