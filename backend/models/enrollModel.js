const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', 
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    scheduleTime: {
      type: String, // Assuming scheduleTime is a date. Change to String if it's a time string.
      required: true // Make it required if you want to enforce that a schedule time must be provided
    }
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;