const faker = require('faker');
// const mongoose = require('mongoose');
const demoHelpers = require('../utils/demoHelpers');
const User = require('../models/user');
const Department = require('../models/departments');
const Competency = require('../models/competency');
const CompetencyType = require('../models/competencyType');
const Course = require('../models/course');
const CourseLevel = require('../models/courseLevel');
const CourseType = require('../models/courseType');
const Role = require('../models/role');
const FeedBack = require('../models/feedback');

const compTypes = ['Desired', 'Required', 'Essential'];
const courseTypes = ['Professional', 'Personal'];
const courseLevels = ['Practioner', 'Foundation', 'Expert'];

module.exports = {
  demoFeedback: async (req, res) => {
    try {
      await FeedBack.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', Feedback.collection.name);
      } else {
        throw e;
      }
    }
  },

  demoUsers: async (req, res) => {
    try {
      await User.deleteMany({});
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
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
      console.log(error);
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
      let depName = [];
      for (let i = 0; i < 8; i++) {
        let departmentName = faker.commerce.department();
        // let departmentCode = demoHelpers.shortName(departmentName, 2);
        depName.push(departmentName);
        // await Department.create({ departmentName, departmentCode });
      }
      // get rid of any duplicates
      let newDepName = [...new Set(depName)];

      // now loop over array to get shortname and add to db
      for (let x in newDepName) {
        await Department.create({
          departmentName: newDepName[x],
          departmentCode: demoHelpers.shortName(newDepName[x], 2)
        });
      }

      const newDepts = await Department.find({});
      res.status(200).send(newDepts);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
  demoCourses: async (req, res) => {
    // drop the comps collection
    try {
      await Course.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', Course.collection.name);
      } else {
        throw e;
      }
    }

    try {
      for (let i = 0; i < 50; i++) {
        let courseName = demoHelpers.randomCourseGenerator();
        let validity = demoHelpers.randomNumberRange(0, 36);
        let type =
          courseTypes[demoHelpers.randomNumberRange(0, courseTypes.length)];
        let level =
          courseLevels[demoHelpers.randomNumberRange(0, courseLevels.length)];

        await Course.create({ courseName, validity, type, level });
      }
      const newCourses = await Course.find({});
      res.status(200).send(newCourses);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
  demoCourseTypes: async (req, res) => {
    try {
      await CourseType.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', CourseType.collection.name);
      } else {
        throw e;
      }
    }

    try {
      for (let x in courseTypes) {
        await CourseType.create({ courseType: courseTypes[x] });
      }
      const newCseTypes = await CourseType.find({});
      res.status(200).send(newCseTypes);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
  demoCourseLevels: async (req, res) => {
    try {
      await CourseLevel.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', CourseLevel.collection.name);
      } else {
        throw e;
      }
    }

    try {
      for (let x in courseLevels) {
        await CourseLevel.create({ courseLevel: courseLevels[x] });
      }
      const newCseLevels = await CourseLevel.find({});
      res.status(200).send(newCseLevels);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  },
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
    let courseEntries = [];

    try {
      compTypeEntries = await CompetencyType.find({});
      if (compTypeEntries.length === 0) {
        console.log('No Competency Types! Add these first!');
        return;
      }

      courseEntries = await Course.find({});

      const courseIds = courseEntries.map((course) => course._id);
      const compTypeIds = compTypeEntries.map((compType) => compType._id);

      for (let i = 0; i < 20; i++) {
        let compName = `${faker.company.catchPhraseAdjective()} ${faker.company.bsNoun()} ${faker.commerce.product()} ${faker.name.jobType()}`;
        let shortName = demoHelpers.shortName(compName, 3);
        //    get a random comptype id
        let compType =
          compTypeIds[demoHelpers.randomNumberRange(0, compTypeIds.length)];
        let courses = demoHelpers.randomCompCourseGenerator(courseIds, 1, 6);

        await Competency.create({ shortName, compName, compType, courses });
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
    try {
      await Role.collection.drop();
    } catch (error) {
      if (error.code === 26) {
        console.log('namespace %s not found', Role.collection.name);
      } else {
        throw e;
      }
    }

    let compEntries = [];

    try {
      compEntries = await Competency.find({});
      const compIds = compEntries.map((comp) => comp._id);
      for (let i = 0; i < 30; i++) {
        let roleName = faker.name.jobTitle();
        let competencies = demoHelpers.randomCompCourseGenerator(compIds, 1, 4);
        await Role.create({ roleName, competencies });
      }
      const newRoles = await Role.find({});
      res.status(200).send(newRoles);
    } catch (error) {
      console.log(error);
      res.status(418).send(error);
    }
  }
};
