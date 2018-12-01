const User = require('../models/user');

module.exports = {
  demoUsers: async (req, res) => {
    //  drop the User collection on the db
    User.collection.drop();
  },
  demoDepts: async (req, res) => {},
  demoCourses: async (req, res) => {},
  demoCourseTypes: async (req, res) => {},
  demoCourseLevels: async (req, res) => {},
  demoComps: async (req, res) => {},
  demoCompType: async (req, res) => {},
  demoRoles: async (req, res) => {}
};
