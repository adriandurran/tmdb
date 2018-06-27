const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const roleController = require('../controllers/roleController');

router.get('/', requireLogin, roleController.getRoles);
router.post('/', requireAdmin, roleController.addRoles);

router.get('/:id', requireLogin, roleController.getRole);
router.put('/:id', requireAdmin, roleController.updateRole);

module.exports = router;
