const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const compController = require('../controllers/compController');

router.get('/', requireLogin, compController.getComps);
router.post('/', requireAdmin, compController.addComps);

router.get('/type', requireLogin, compController.getCompTypes);
router.post('/type', requireAdmin, compController.addCompType);
router.delete('/type', requireAdmin, compController.deleteCompType);

router.get('/:id', requireAdmin, compController.getCompetency);

module.exports = router;
