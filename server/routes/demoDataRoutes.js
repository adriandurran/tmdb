const express = require('express');
const router = express.Router();

const demoData = require('../controllers/demoDataController');

router.get('/users', demoData.demoUsers);
router.get('/depts', demoData.demoDepts);
router.get('/roles', demoData.demoRoles);
router.get('/comptypes', demoData.demoCompType);
router.get('/comps', demoData.demoComps);
router.get('/courses', demoData.demoCourses);
router.get('/coursetypes', demoData.demoCourseTypes);
router.get('/courselevels', demoData.demoCourseLevels);

module.exports = router;
