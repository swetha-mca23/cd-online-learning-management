const Course = require('../models/CourseModel');
const User = require('../models/userModel'); // Assuming the User model represents both instructors and students

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructorId', 'userName email'); // Populate instructor from Users collection
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses', error: error.message });
  }
};

// Get a single course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructorId', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch course', error: error.message });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  try {
    
    const { courseName, instructor, enrolledStudents, description, category, duration, price , coursePoster } = req.body;

    
    const foundinstructor = await User.findById(instructor);
    
    if (!foundinstructor || foundinstructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found or is not an instructor' });
    }


    const newCourse = new Course({
      courseName,
      instructorId : instructor,
      enrolledStudents,
      coursePoster,
      description,
      category,
      duration,
      price,
    });

    const savedCourse = await newCourse.save();
    console.log(savedCourse);
    
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create course', error: error.message });
  }
};

// Update an existing course
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseName, instructor, enrolledStudents, description, category, duration, price , coursePoster } = req.body;

    // Ensure instructor exists in the Users collection
    const foundinstructor = await User.findById(instructor);
    if (!foundinstructor || foundinstructor.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found or is not an instructor' });
    }

    const updatedData = {
      courseName,
      instructor,
      enrolledStudents,
      description,
      category,
      duration,
      price,
      coursePoster
    };

    const updatedCourse = await Course.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

const getCourseCount = async (req, res) => {
  
  try {
       
    const courseCount = await Course.countDocuments({}); 
    console.log(courseCount);
    
    res.status(200).json({ count: courseCount });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course count", error: true, success: false });
  }
};

// Get courses allocated to a specific instructor (based on user ID passed in middleware)
const getCoursesForInstructor = async (req, res) => {
  try {
    const instructorId = req.user.id; // Assuming userId is passed in the request object by middleware
    
    // Find courses where the instructorId matches the logged-in user's ID
    const courses = await Course.find({ instructorId }).populate('instructorId', 'userName email');
    
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this instructor' });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses for instructor', error: error.message });
  }
};


module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseCount,
  getCoursesForInstructor
};
