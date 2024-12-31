const express = require('express');
const router = express.Router();
const { enrollStudent, getEnrolledCourses, getEnrolledStudentsByCourseId } = require('../controllers/EnrollmentController')
const { auth } = require('../middleware/auth');


router.post('/course',auth, enrollStudent);
router.get("/enrolledCourses" , auth , getEnrolledCourses);
router.get("/getByCourseId/:courseId" , getEnrolledStudentsByCourseId)

module.exports = router;
