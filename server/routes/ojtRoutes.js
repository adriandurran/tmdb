const express = require('express');
const router = express.Router();

const ojtControllers = require('../controllers/ojtControllers');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

router.get('/', requireLogin, ojtControllers.getOJTS);
router.get('/types', requireLogin, ojtControllers.getOJTType);

module.exports = router;
