const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User ', // Reference to the User model
    required: true
  },
  submissionStatus: {
    type: String,
    enum: ['submitted', 'not submitted'],
    default: 'not submitted'
  },
  submissionDate: {
    type: Date,
    default: null
  }
});

const homeworkSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  visibilityStatus: {
    type: String,
    enum: ['visible', 'hidden'],
    default: 'visible'
  },
  submissions: [submissionSchema] // Array of submissions
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('Homework', homeworkSchema);