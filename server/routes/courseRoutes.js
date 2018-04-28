const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const Course = require('../models/course');
const CourseType = require('../models/courseType');
const CourseLevel = require('../models/courseLevel');

const courseController = require('../controllers/courseController');

module.exports = app => {
  // Course Types
  app.get('/api/course-types', requireLogin, courseController.getCourseTypes);

  app.post('/api/course-types', requireAdmin, courseController.addCourseTypes);

  app.delete(
    '/api/course-types',
    requireAdmin,
    courseController.deleteCourseTypes
  );

  // Course Levels
  app.get('/api/course-levels', requireLogin, async (req, res) => {
    const dbCourseLevels = await CourseLevel.find({});
    res.send(dbCourseLevels);
  });

  app.post('/api/course-levels', requireAdmin, async (req, res) => {
    const newLevel = req.body;
    const newCourseLevel = await CourseLevel.create(newLevel);
    res.send(newCourseLevel);
  });

  app.delete('/api/course-levels', requireAdmin, async (req, res) => {
    const remCourseLevel = await CourseLevel.remove({ _id: req.query.id });
    if (remCourseLevel.ok > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(418);
    }
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
