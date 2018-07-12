const Version = require('../models/version');
const { FeedBack, FeedBackType } = require('../models/feedback');

module.exports = {
  // get version details
  getVersionDetails: async (req, res) => {
    const dbVersion = await Version.find({});
    res.send(dbVersion);
  },

  addVersionDetails: async (req, res) => {
    const newVersion = await Version.create(req.body);
    res.send(newVersion);
  },

  getFeedBack: async (req, res) => {
    const dbFeedback = await FeedBack.find({});
    res.send(dbFeedback);
  },

  addFeedBack: async (req, res) => {
    const newFeedback = await FeedBack.create(req.body);
    res.send(newFeedback);
  },

  getFeedBackType: async (req, res) => {
    const dbFeedbackType = await FeedBackType.find({});
    res.send(dbFeedbackType);
  },

  addFeedBackType: async (req, res) => {
    const newFeedbackType = await FeedBackType.create(req.body);
    res.send(newFeedbackType);
  }
};
