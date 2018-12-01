const faker = require('faker');
const mongoose = require('mongoose');
const demoHelpers = require('../utils/demoHelpers');
const User = require('../models/user');
const Department = require('../models/departments');
const Competency = require('../models/competency');
const CompetencyType = require('../models/competencyType');

const compTypes = ['Desired', 'Required', 'Essential'];

module.exports = {
  demoUsers: async (req, res) => {
    //  drop the Users who are not superAdmin
    User.deleteMany({ isSuperAdmin: false }, (err) => {
      if (err) {
        console.log(err);
      }
    });

    let usep = new User();
    let passwordHash = await usep.generateHash('password123');

    try {
      for (let i = 0; i < 50; i++) {
        let demoUser = {
          userId: demoHelpers.demoUserId(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.email(),
          passwordHash: passwordHash,
          imageUrl: faker.image.imageUrl()
        };

        await User.create(demoUser);
      }
      const newUsers = await User.find({});
      res.status(200).send(newUsers);
    } catch (error) {
      res.status(418).send(error);
    }
  },

  demoDepts: async (req, res) => {
    // clear out all the depts
    try {
      await Department.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', Department.collection.name);
      } else {
        throw e;
      }
    }

    try {
      for (let i = 0; i < 8; i++) {
        let departmentName = faker.commerce.department();
        let departmentCode = demoHelpers.shortName(departmentName, 2);

        await Department.create({ departmentName, departmentCode });
      }
      const newDepts = await Department.find({});
      res.status(200).send(newDepts);
    } catch (error) {
      res.status(418).send(error);
    }
  },
  demoCourses: async (req, res) => {},
  demoCourseTypes: async (req, res) => {},
  demoCourseLevels: async (req, res) => {},
  demoComps: async (req, res) => {
    // drop the comps collection
    try {
      await Competency.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', Competency.collection.name);
      } else {
        throw e;
      }
    }
    // need to get the comptypes from the db (for their id)
    let compTypeEntries = [];
    try {
      compTypeEntries = await CompetencyType.find({});
      if (compTypeEntries.length === 0) {
        console.log('No Competency Types! Add these first!');
        return;
      }

      const compTypeIds = compTypeEntries.map((compType) => compType._id);

      for (let i = 0; i < 20; i++) {
        let compName = faker.name.jobTitle();
        let shortName = demoHelpers.shortName(compName, 3);
        //    get a random comptype id
        let compType =
          compTypeIds[demoHelpers.randomNumberRange(0, compTypeIds.length)];

        await Competency.create({ shortName, compName, compType });
      }

      const newComps = await Competency.find({});
      res.status(200).send(newComps);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
  demoCompType: async (req, res) => {
    //   need to drop the competency collection also
    try {
      for (let model of [CompetencyType, Competency]) {
        try {
          await model.collection.drop();
        } catch (e) {
          if (e.code === 26) {
            console.log('namespace %s not found', model.collection.name);
          } else {
            throw e;
          }
        }
      }

      for (let x in compTypes) {
        await CompetencyType.create({ compType: compTypes[x] });
      }

      const newCompTypes = await CompetencyType.find({});
      res.status(200).send(newCompTypes);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
  demoRoles: async (req, res) => {
    for (let i = 0; i < 20; i++) {
      let roles = {
        jobTitle: faker.name.jobTitle(),
        jobDescriptor: faker.name.jobDescriptor(),
        jobArea: faker.name.jobArea(),
        jobType: faker.name.jobType()
      };
      console.log(roles);
    }
  }
};
