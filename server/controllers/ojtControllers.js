const OnJobTraining = require('../models/onjobtraining');
const OJTType = require('../models/ojtType');

module.exports = {
  getOJTS: async (req, res) => {
    const ojts = await OnJobTraining.find({});
    res.send(ojts);
  },
  getOJTType: async (req, res) => {
    const ojtTypes = await OJTType.find({});
    res.send(ojtTypes);
  }
};
