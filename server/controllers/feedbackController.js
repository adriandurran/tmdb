const Version = require('../models/version');
const FeedBack = require('../models/feedback');
const FeedBackType = require('../models/feedbacktype');

module.exports = {
  // get version details
  getVersionDetails: async (req, res) => {
    const dbVersion = await Version.find({});
    res.send(dbVersion);
  },

  getVersionLatest: async (req, res) => {
    const lastVersion = await Version.findOne({}, {}, { sort: { _id: -1 } });
    res.send(lastVersion);
  },

  addVersionDetails: async (req, res) => {
    // console.log(req.body);
    const newVersion = await Version.create(req.body);
    res.send(newVersion);
  },

  getFeedBack: async (req, res) => {
    const dbFeedback = await FeedBack.find({}).populate('feedBackUser');
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
  },

  deleteFeedBackType: async (req, res) => {
    try {
      const delFeedbackType = await FeedBackType.remove({ _id: req.params.id });
      if (delFeedbackType.ok > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(418);
      }
    } catch (error) {
      res.send(error);
    }
  }
};
