const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const feedbackController = require('../controllers/feedbackController');

router.get('/feedback', requireLogin, feedbackController.getFeedBack);
router.post('/feedback', requireLogin, feedbackController.addFeedBack);

router.get('/feedbacktype', requireLogin, feedbackController.getFeedBackType);
router.post('/feedbacktype', requireAdmin, feedbackController.addFeedBackType);

router.get('/version', feedbackController.getVersionDetails);
router.post('/version', requireAdmin, feedbackController.addVersionDetails);

module.exports = router;
