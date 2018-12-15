const OnJobTraining = require('../models/onjobtraining');

module.exports = {
  getOJTS: async (req, res) => {
    const ojts = await OnJobTraining.find({});
    res.send(ojts);
  }
};
