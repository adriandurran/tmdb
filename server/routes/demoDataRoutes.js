const express = require('express');
const router = express.Router();

const demoData = require('../controllers/demoDataController');

router.get('/users', demoData.demoUsers);
router.get('/depts', demoData.demoDepts);
router.get('/roles', demoData.demoRoles);
router.get('/comptypes', demoData.demoCompType);
router.get('/comps', demoData.demoComps);

module.exports = router;
