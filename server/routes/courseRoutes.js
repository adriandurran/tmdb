const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

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
  app.get('/api/course-levels', requireLogin, courseController.getCourseLevels);

  app.post(
    '/api/course-levels',
    requireAdmin,
    courseController.addCourseLevels
  );

  app.delete(
    '/api/course-levels',
    requireAdmin,
    courseController.deleteCourseLevels
  );

  // Courses
  app.get('/api/courses', requireLogin, courseController.getCourses);

  app.post('/api/courses', requireAdmin, courseController.addCourses);

  app.get('/api/courses/:id', requireLogin, courseController.getCourse);
};
