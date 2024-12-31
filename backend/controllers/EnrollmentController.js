const Enrollment = require('../models/enrollModel.js'); // Adjust the path as necessary
const Course = require('../models/CourseModel');

// Function to enroll a student in a course
const enrollStudent = async (req, res) => {
    const { course, date, time } = req.body; // Get data from request body
    const userId = req.user.id; // Get user ID from middleware
    console.log(userId);
    

    try {
        // Create a new enrollment
        const enrollment = new Enrollment({
            studentId: userId,
            courseId: course,
            enrollmentDate: date, // Assuming you want to store the date of enrollment
            scheduleTime: time, // Store the scheduled time
        });

        await enrollment.save(); // Save enrollment

        // Update the course to increment the enrolled students count
        await Course.findByIdAndUpdate(course, { $inc: { enrolledStudents: 1 } });

        res.status(201).json({ message: 'Enrollment successful', enrollment });
    } catch (error) {
        res.status(500).json({ message: 'Enrollment failed', error });
    }
};

const getEnrolledCourses = async (req, res) => {
    const userId = req.user.id; // Get user ID from middleware

    try {
        // Find all enrollments for the user
        const enrollments = await Enrollment.find({ studentId: userId }).populate('courseId');

        // If no enrollments found
        if (!enrollments.length) {
            return res.status(404).json({ message: 'No enrolled courses found' });
        }

        res.status(200).json(enrollments); // Return the list of enrollments
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve enrolled courses', error });
    }
};

const getEnrolledStudentsByCourseId = async (req, res) => {
    const { courseId } = req.params; // Get courseId from request parameters
    console.log(courseId);
    
    try {
        // Find all enrollments for the specified course
        const enrollments = await Enrollment.find({ courseId }).populate("studentId" , "userName email").populate("courseId")
        
            console.log("enrolles" , enrollments);
        
        if (!enrollments.length) {
            return res.status(404).json({ message: 'No students enrolled in this course' });
        }

        res.status(200).json(enrollments); 
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve enrolled students', error });
    }
};

module.exports = {
    enrollStudent,
    getEnrolledCourses,
    getEnrolledStudentsByCourseId
};