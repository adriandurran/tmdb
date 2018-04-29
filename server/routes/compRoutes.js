const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const compController = require('../controllers/compController');

module.exports = app => {
  app.get('/api/competencies', requireLogin, compController.getComps);

  app.post('/api/competencies', requireAdmin, compController.addComps);
};
