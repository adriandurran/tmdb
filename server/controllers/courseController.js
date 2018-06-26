const Course = require('../models/course');
const CourseType = require('../models/courseType');
const CourseLevel = require('../models/courseLevel');

module.exports = {
  // Course Types
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
  },

  //  Course Levels
  getCourseLevels: async (req, res) => {
    const dbCourseLevels = await CourseLevel.find({});
    res.send(dbCourseLevels);
  },

  addCourseLevels: async (req, res) => {
    const newLevel = req.body;
    const newCourseLevel = await CourseLevel.create(newLevel);
    res.send(newCourseLevel);
  },

  deleteCourseLevels: async (req, res) => {
    const remCourseLevel = await CourseLevel.remove({ _id: req.query.id });
    if (remCourseLevel.ok > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(418);
    }
  },

  //   Courses
  getCourses: async (req, res) => {
    const dbCourses = await Course.find({});
    res.send(dbCourses);
  },

  addCourses: async (req, res) => {
    const newCourse = req.body;
    const newCourseCreated = await Course.create(newCourse);
    res.send(newCourseCreated);
  },

  getCourse: async (req, res) => {
    const dbCourse = await Course.findById(req.params.id);
    res.send(dbCourse);
  },

  updateCourse: async (req, res) => {
    try {
      const upCourse = await Course.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.send(upCourse);
    } catch (error) {
      res.sendStatus(418).send(error);
    }
  }
};
