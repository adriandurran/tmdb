const Competency = require('../models/competency');
const CompetencyType = require('../models/competencyType');

module.exports = {
  getComps: async (req, res) => {
    const dbComps = await Competency.find({})
      .populate('courses')
      .populate('compType');
    res.send(dbComps);
  },

  addComps: async (req, res) => {
    const newComp = req.body;
    const newCompCreated = await Competency.create(newComp);
    res.send(newCompCreated);
  },

  addCompType: async (req, res) => {
    const newCompType = req.body;
    const dbNewCompType = await CompetencyType.create(newCompType);
    res.send(dbNewCompType);
  },

  getCompTypes: async (req, res) => {
    const dbCompTypes = await CompetencyType.find({});
    res.send(dbCompTypes);
  },

  deleteCompType: async (req, res) => {
    const remCompType = await CompetencyType.remove({ _id: req.query.id });
    if (remCompType.ok > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(418);
    }
  },

  getCompetency: async (req, res) => {
    const dbComp = await Competency.findById(req.params.id)
      .populate('courses')
      .populate('compType');
    res.send(dbComp);
  },

  updateCompetency: async (req, res) => {
    try {
      const upComp = await Competency.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
        .populate('courses')
        .populate('compType');

      res.send(upComp);
    } catch (error) {
      res.sendStatus(418).send(error);
    }
  },

  deleteCompetency: async (req, res) => {
    try {
      const delComp = await Competency.remove({ _id: req.params.id });
      if (delComp.ok > 0) {
        res.sendStatus(200);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(418).send(error);
    }
  }
};
