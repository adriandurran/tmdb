const faker = require('faker');
const demoHelpers = require('../utils/demoHelpers');
const User = require('../models/user');

module.exports = {
  demoUsers: async (req, res) => {
    //  drop the User collection on the db
    // User.collection.drop();
    let usep = new User();
    let passwordHash = await usep.generateHash('password123');

    let demoUser = {
      userId: demoHelpers.demoUserId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.email(),
      passwordHash: passwordHash,
      imageUrl: faker.image.imageUrl()
    };

    console.log(demoUser);
    User.create(demoUser)
      .then((user) => res.status(200).send(user))
      .catch((err) => res.status(400).send(err));
  },

  demoDepts: async (req, res) => {},
  demoCourses: async (req, res) => {},
  demoCourseTypes: async (req, res) => {},
  demoCourseLevels: async (req, res) => {},
  demoComps: async (req, res) => {},
  demoCompType: async (req, res) => {},
  demoRoles: async (req, res) => {}
};
