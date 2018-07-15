const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const feedbackController = require('../controllers/feedbackController');

router.get('/feedback', requireLogin, feedbackController.getFeedBack);
router.post('/feedback', requireLogin, feedbackController.addFeedBack);
router.get(
  '/feedback/type/:id',
  requireLogin,
  feedbackController.filterFeedBack
);

router.get('/feedbacktype', requireLogin, feedbackController.getFeedBackType);
router.post('/feedbacktype', requireAdmin, feedbackController.addFeedBackType);
router.delete(
  '/feedbacktype/:id',
  requireAdmin,
  feedbackController.deleteFeedBackType
);

router.get('/version', requireLogin, feedbackController.getVersionDetails);
router.get('/version/latest', feedbackController.getVersionLatest);
router.post('/version', requireAdmin, feedbackController.addVersionDetails);

module.exports = router;
