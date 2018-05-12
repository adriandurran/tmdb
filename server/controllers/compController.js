const Competency = require('../models/competency');

module.exports = {
  getComps: async (req, res) => {
    const dbComps = await Competency.find({}).populate('courses');
    res.send(dbComps);
  },

  addComps: async (req, res) => {
    const newComp = req.body;
    const newCompCreated = await Competency.create(newComp);
    res.send(newCompCreated);
  }
};
