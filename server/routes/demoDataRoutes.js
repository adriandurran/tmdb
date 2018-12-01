const express = require('express');
const router = express.Router();

const demoData = require('../controllers/demoDataController');

router.get('/users', demoData.demoUsers);

module.exports = router;
