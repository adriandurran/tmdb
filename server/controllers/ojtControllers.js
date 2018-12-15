const OnJobTraining = require('../models/onjobtraining');
const OJTType = require('../models/ojtType');

module.exports = {
  getOJTS: async (req, res) => {
    const ojts = await OnJobTraining.find({});
    res.send(ojts);
  },
  getOJTTypes: async (req, res) => {
    const ojtTypes = await OJTType.find({});
    res.send(ojtTypes);
  },

  addOJTType: async (req, res) => {
    const newOJTType = await OJTType.create(req.body);
    res.send(newOJTType);
  }
};
