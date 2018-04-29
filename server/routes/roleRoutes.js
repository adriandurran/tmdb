const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const roleController = require('../controllers/roleController');

module.exports = app => {
  app.get('/api/roles', requireLogin, roleController.getRoles);
  app.post('/api/roles', requireAdmin, roleController.addRoles);
};
