import React, { useState, useEffect } from "react";
import "../../styles/Admin/Courses.css"; 
import AdminHeader from "./AdminHeader";
import url from "../../helper/url";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Courses = () => {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [courseDetails, setCourseDetails] = useState({
    courseName: "",
    instructor: "",
    enrolledStudents: 0,
    coursePoster: "",
    description: "",
    category: "",
    duration: "",
    price: 0,
  });
  const [editMode, setEditMode] = useState(false); 
  const [editCourseId, setEditCourseId] = useState(null); 
  const [instructors, setInstructors] = useState([]); 
  const [courses, setCourses] = useState([]); 

  useEffect(() => {
    
    const fetchInstructors = async () => {
      try {
        const response = await fetch(`${url}/auth/instructor`);
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();
        console.log(data);

        setInstructors(data.instructors);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${url}/api/courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructors();
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
    console.log(courseDetails);

  };

  const handleFileChange = (e) => {
    setCourseDetails({ ...courseDetails, coursePoster: e.target.files[0] });
  };

  const handleAddOrUpdateCourse = async (e) => {
    e.preventDefault();

    const formData = {
      courseName: courseDetails.courseName,
      instructor: courseDetails.instructor,
      enrolledStudents: courseDetails.enrolledStudents,
      coursePoster: courseDetails.coursePoster, // Just send the URL/text
      description: courseDetails.description,
      category: courseDetails.category,
      duration: courseDetails.duration,
      price: courseDetails.price,
    };

    try {
      const finalurl = `${url}${editMode ? "/api/courses/" + editCourseId : "/api/courses"}`;
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(finalurl, {
        method,
        headers: {
          "Content-Type": "application/json",  // Sending JSON data
        },
        body: JSON.stringify(formData), // Sending JSON, not FormData
      });

      if (!response.ok) {
        throw new Error(editMode ? "Failed to update course" : "Failed to add course");
      }

      console.log(editMode ? "Course updated successfully" : "Course added successfully");
      toast.success(editMode?"Course updated successfully" : "Course added successfully")
      setShowForm(false);
      setEditMode(false);
      setCourseDetails({
        courseName: "",
        instructor: "",
        enrolledStudents: 0,
        coursePoster: "",
        description: "",
        category: "",
        duration: "",
        price: 0,
      });
      // Refresh courses list
      const updatedCourses = await fetch(`${url}/api/courses`).then((res) => res.json());
      console.log(updatedCourses);
      
      setCourses(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCourse = (course) => {
    console.log("edit ",course);
    
    setCourseDetails({
      courseName: course.courseName,
      instructor: course.instructor,
      enrolledStudents: course.enrolledStudents,
      description: course.description,
      category: course.category,
      duration: course.duration,
      price: course.price,
      coursePoster:course.coursePoster,
    });
    setEditCourseId(course._id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`${url}/api/courses/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete course");
      }

      console.log("Course deleted successfully");
      // Refresh courses list
      const updatedCourses = await fetch(`${url}/api/courses`).then((res) => res.json());
      toast.success("Course updated!")
      setCourses(updatedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="main-content">
      <ToastContainer position="top-center" autoClose={3000} />
        <div className="courses-container">
          <h1>Manage Courses</h1>
          <button
            className="add-course-btn"
            onClick={() => {
              setShowForm(!showForm);
              setEditMode(false);
              setCourseDetails({
                courseName: "",
                instructor: "",
                enrolledStudents: 0,
                coursePoster: null,
                description: "",
                category: "",
                duration: "",
                price: 0,
              });
            }}
          >
            {showForm ? "Close Form" : "Add New Course"}
          </button>

          {showForm && (
            <div className="modal-overlay">
              <form className="add-course-form" onSubmit={handleAddOrUpdateCourse} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
                <button
                  type="button"
                  className="close-form-btn"
                  onClick={() => setShowForm(false)} // Close the form on click
                  style={{ backgroundColor: '#5980db', color: 'white', padding: '5px 10px', marginBottom: '10px', marginLeft: '97%' }}
                >
                  X
                </button>
                <h2>{editMode ? "Edit Course" : "Add New Course"}</h2>

                <div className="form-group">
                  <label htmlFor="courseName">Course Name:</label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={courseDetails.courseName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="instructor">Instructor:</label>
                  <select
                    id="instructor"
                    name="instructor"
                    value={courseDetails.instructor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((instructor) => (
                      <option key={instructor._id} value={instructor._id}>
                        {instructor.userName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="enrolledStudents">Enrolled Students:</label>
                  <input
                    type="number"
                    id="enrolledStudents"
                    name="enrolledStudents"
                    value={courseDetails.enrolledStudents}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="coursePoster">Course Poster:</label>
                  <input
                    type="text"
                    id="coursePoster"
                    name="coursePoster"
                    value={courseDetails.coursePoster}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseDetails.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={courseDetails.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="duration">Duration (e.g., 10 hours):</label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={courseDetails.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price ($):</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={courseDetails.price}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  {editMode ? "Update Course" : "Add Course"}
                </button>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Instructor</th>
                <th>Enrolled Students</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.instructorId.userName}</td>
                  <td>{course.enrolledStudents}</td>
                  <td>
                    <button onClick={() => handleEditCourse(course)} style={{ backgroundColor: '#0F52BA' }}>Edit</button>
                    <button onClick={() => handleDeleteCourse(course._id)} style={{ backgroundColor: '#0F52BA' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
