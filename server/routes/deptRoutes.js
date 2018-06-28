const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const deptController = require('../controllers/deptController');

router.get('/', requireLogin, deptController.getDepts);
router.post('/', requireAdmin, deptController.addDept);

router.get('/:id', requireLogin, deptController.getDept);
router.put('/:id', requireAdmin, deptController.updateDept);

module.exports = router;
