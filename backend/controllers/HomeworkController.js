const Homework = require('../models/HomeWorkModel');
const User = require('../models/userModel');
const Enrollment = require("../models/enrollModel")

exports.addHomework = async (req, res) => {
    const { courseId, title, description, dueDate } = req.body;
    const homework = new Homework({ courseId, title, description, dueDate });
    await homework.save();
    res.status(201).send({ message: 'Homework added successfully' });
}

exports.getByCourse = async (req, res) => {
    const { courseId } = req.params;
    const homeworkList = await Homework.find({ courseId });
    res.status(200).send(homeworkList);
}

exports.submitHomework = async (req, res) => {
    const { homeworkId} = req.body;
    const studentId = req.user.id;

    const homework = await Homework.findById(homeworkId);
    if (homework) {
      const submission = homework.submissions.find(sub => sub.studentId.toString() === studentId);
      if (submission) {
        submission.submissionStatus = 'submitted';
        submission.submissionDate = new Date();
      } else {
        homework.submissions.push({ studentId, submissionStatus: 'submitted', submissionDate: new Date() });
      }
      await homework.save();
      res.status(200).send({ message: 'Homework submitted successfully' });
    } else {
      res.status(404).send({ message: 'Homework not found' });
    }
  }

  exports.getUserHomework = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the request
    console.log(userId);
    

    try {
        // Step 1: Fetch the courses the user is enrolled in
        const enrollments = await Enrollment.find({ studentId: userId }).populate('courseId');
        console.log(enrollments);
        
        const courseIds = enrollments.map(enrollment => enrollment.courseId._id);
console.log(courseIds);

        // Step 2: Fetch homework for each course
        const homeworkList = await Homework.find({ courseId: { $in: courseIds } }).populate('courseId');
console.log(homeworkList);

        // Step 3: Combine homework with submission status
        const homeworkWithStatus = homeworkList.map(homework => {
            const submission = homework.submissions.find(sub => sub.studentId.toString() === userId);
            return {
                ...homework.toObject(), // Convert Mongoose document to plain object
                submissionStatus: submission ? submission.submissionStatus : 'not submitted',
                submissionDate: submission ? submission.submissionDate : null,
            };
        });

        res.status(200).send(homeworkWithStatus);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve homework', error });
    }
};