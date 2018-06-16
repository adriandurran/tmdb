const express = require('express');
const router = express.Router();

const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');

const courseController = require('../controllers/courseController');

// Course Types
router.get('/course-types', requireLogin, courseController.getCourseTypes);

router.post('/course-types', requireAdmin, courseController.addCourseTypes);

router.delete(
  '/course-types',
  requireAdmin,
  courseController.deleteCourseTypes
);

// Course Levels
router.get('/course-levels', requireLogin, courseController.getCourseLevels);

router.post('/course-levels', requireAdmin, courseController.addCourseLevels);

router.delete(
  '/course-levels',
  requireAdmin,
  courseController.deleteCourseLevels
);

// Courses
router.get('/', requireLogin, courseController.getCourses);

router.post('/', requireAdmin, courseController.addCourses);

router.get('/:id', requireLogin, courseController.getCourse);

module.exports = router;
