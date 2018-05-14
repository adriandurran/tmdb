const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const userController = require('../controllers/userController');

module.exports = app => {
  app.get('/api/admin/allusers', requireAdmin, userController.allUsers);
};
