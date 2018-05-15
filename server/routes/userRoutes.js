const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/userController');

module.exports = app => {
  app.get('/api/admin/allusers', requireAdmin, userController.allUsers);
  app.patch(
    '/api/admin/users/:id/verify',
    requireAdmin,
    userController.verifyUser
  );
};
