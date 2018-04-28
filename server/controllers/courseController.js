const Course = require('../models/course');
const CourseType = require('../models/courseType');
const CourseLevel = require('../models/courseLevel');

module.exports = {
  getCourseTypes: async (req, res) => {
    const dbCourseTypes = await CourseType.find({});
    res.send(dbCourseTypes);
  },

  addCourseTypes: async (req, res) => {
    const newType = req.body;
    const newCourseType = await CourseType.create(newType);
    res.send(newCourseType);
  },

  deleteCourseTypes: async (req, res) => {
    const remCourseType = await CourseType.remove({ _id: req.query.id });
    if (remCourseType.ok > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(418);
    }
  }
};
