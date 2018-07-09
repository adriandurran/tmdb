const Department = require('../models/departments');

module.exports = {
  getDepts: async (req, res) => {
    try {
      const dbDepts = await Department.find({});
      res.send(dbDepts);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  getDept: async (req, res) => {
    try {
      const dbDept = await Department.findById(req.params.id);
      res.send(dbDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },

  addDept: async (req, res) => {
    try {
      const newDept = await Department.create(req.body);
      res.send(newDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  },
  updateDept: async (req, res) => {
    try {
      const upDept = await Department.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.send(upDept);
    } catch (error) {
      return res.status(418).send(error);
    }
  }
};
