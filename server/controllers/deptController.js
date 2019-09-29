const Department = require('../models/departments');

module.exports = {
  getDepts: async (req, res) => {
    try {
      const dbDepts = await Department.find({}).populate('managers');
      res.send(dbDepts);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  getDept: async (req, res) => {
    try {
      const dbDept = await Department.findById(req.params.id).populate(
        'managers'
      );
      res.send(dbDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  addDept: async (req, res) => {
    try {
      const newDept = await Department.create(req.body);
      const popNewDept = await Department.findById(newDept._id).populate(
        'managers'
      );
      res.send(popNewDept);
    } catch (error) {
      console.log(error);
      return res.status(418).send(error);
    }
  },
  updateDept: async (req, res) => {
    try {
      const upDept = await Department.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).populate('managers');
      res.send(upDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  deleteDept: async (req, res) => {
    try {
      const remDept = await Department.remove({ _id: req.params.id });
      if (remDept.ok > 0) {
        res.sendStatus(200);
      }
    } catch (error) {
      return res.status(418).send(error);
    }
  }
};
