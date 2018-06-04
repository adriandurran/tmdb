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
  }
};
