import React, { useEffect, useState } from 'react';
import url from '../../helper/url';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ course: '', date: '', time: '' });
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchEnrolledCourses = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${url}/enroll/enrolledCourses`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Enrolled", data);
      if(!data.message){
        setEnrolledCourses(data); 
     }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${url}/enroll/course`, {
        method: "post",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const temp = await response.json();
      fetchEnrolledCourses()
      toast.success("enrolled successfully!")
      console.log('Form submitted:', temp);
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${url}/api/courses`);
        const data = await response.json();
        console.log("Course", data);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  useEffect(() => {
    

    fetchEnrolledCourses();
  }, []);

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>My Courses</h2>
      <div style={styles.header}>
        <h3 style={styles.title}>Enrolled Courses</h3>
        <button style={styles.enrollButton} onClick={() => setShowForm(true)}>Enroll in New Course</button>
      </div>
      <div style={styles.coursesContainer}>
        {enrolledCourses.map((course, index) => (
          <div key={index} style={styles.courseCard}>
            <img src={course?.courseId?.coursePoster} alt={course?.courseId?.courseName} style={styles.courseImage}/>
            <div style={styles.courseDetails}>
              <h4 style={styles.courseName}>{course?.courseId?.courseName}</h4>
              <div style={{display:"flex" , justifyContent:"space-between" , width:"155%"}}>
              <p style={styles.courseInfo}>
                <ion-icon
                  name="calendar-outline"
                  style={{ color: 'gray', fontSize: '16px', marginRight: '2px' }}
                ></ion-icon> 
                {new Date(course.enrollmentDate).toLocaleDateString()}
              </p>
              <p style={styles.courseInfo}>
                <ion-icon
                  name="time"
                  style={{ color: 'gray', fontSize: '16px', marginRight: '2px' }}
                ></ion-icon> 
                {course.scheduleTime}
              </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formContainer}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
              <h2>Book a Special Class</h2>
              <ion-icon
                name="close"
                style={{ color: 'black', fontSize: '24px', marginRight: '2px' }}
                onClick={() => setShowForm(false)}></ion-icon>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
              <select
 name="course"
                value={formData.course}
                onChange={handleInputChange}
                style={styles.input}
                required
              >
                <option value="" disabled>Select a course</option>
                {loading ? (
                  <option>Loading courses...</option>
                ) : (
                  courses.map(course => (
                    <option key={course._id} value={course._id}>{course?.courseName}</option>
                  ))
                )}
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    paddingLeft: '50px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  coursesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  courseCard: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    padding: '10px',
    alignItems: 'center',
    width: '150px', 
    flexDirection:"column",
    width:"300px",
  },
  courseImage: {
    width: '250px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  courseDetails: {
    paddingLeft: '10px',
    flex: 1,
    width:"100%"
  },
  courseName: {
    margin: '0',
    fontSize: '22px',
    textAlign:"center",
    marginTop:"20px",
    marginBottom:"20px"
  },
  courseInfo: {
    margin: '2px 0',
    fontSize: '12px',
    color: 'gray',
    width:"100%"
  },
  enrollButton: {
    padding: '8px 16px',
    backgroundColor: '#0F52BA',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: "10px",
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '2px',
    border: "1px solid #ccc",
    outline: "none"
  },
  submitButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#0F52BA',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};