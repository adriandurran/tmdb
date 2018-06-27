const Role = require('../models/role');

module.exports = {
  getRoles: async (req, res) => {
    const dbRoles = await Role.find({}).populate({
      path: 'competencies',
      populate: [{ path: 'courses' }, { path: 'compType' }]
    });

    res.send(dbRoles);
  },

  addRoles: async (req, res) => {
    const newRole = req.body;
    const newRoleCreated = await Role.create(newRole);
    res.send(newRoleCreated);
  },

  getRole: async (req, res) => {
    const dbRole = await Role.findById(req.params.id).populate({
      path: 'competencies',
      populate: [{ path: 'courses' }, { path: 'compType' }]
    });

    res.send(dbRole);
  },

  updateRole: async (req, res) => {
    try {
      const upRole = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).populate({
        path: 'competencies',
        populate: [{ path: 'courses' }, { path: 'compType' }]
      });
      res.send(upRole);
    } catch (error) {
      res.sendStatus(418).send(error);
    }
  }
};
