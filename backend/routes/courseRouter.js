const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const upload = require('../middleware/upload'); 
const { auth } = require('../middleware/auth');
const { addHomework, submitHomework, getByCourse, getUserHomework } = require('../controllers/HomeworkController');

// Course routes
router.get('/courses', courseController.getAllCourses);
router.get('/courses/:id', courseController.getCourseById);
router.post('/courses', courseController.createCourse);
router.put('/courses/:id',  courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);
router.get('/count', courseController.getCourseCount);
router.get("/instructor/courses" , auth,courseController.getCoursesForInstructor);

router.post("/homework" , addHomework);
router.get("/homework/:courseId" , getByCourse);
router.post("/homework/submit",auth,submitHomework);
router.get("/homework",auth,getUserHomework


)

module.exports = router;