const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const Course = require('../models/course');
const CourseType = require('../models/courseType');
const CourseLevel = require('../models/courseLevel');

module.exports = app => {
  // Course Types
  app.get('/api/course-types', requireLogin, async (req, res) => {
    const dbCourseTypes = await CourseType.find({});
    res.send(dbCourseTypes);
  });

  // Course Levels
  app.get('/api/course-levels', requireLogin, async (req, res) => {
    const dbCourseLevels = await CourseLevel.find({});
    res.send(dbCourseLevels);
  });

  // Courses
  app.get('/api/courses', requireLogin, async (req, res) => {
    const dbCourses = await Course.find({});
    console.log(dbCourses);
    res.send(dbCourses);
  });

  app.post('/api/courses', requireAdmin, async (req, res) => {
    const newCourse = req.body;
    const newCourseCreated = await Course.create(newCourse);
    res.send(newCourseCreated);
  });
};
