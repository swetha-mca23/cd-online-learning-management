import React, { useEffect, useState } from 'react';
import Layout from './Layout';  
import '../../styles/instructor/instructorPage.css';
import url from '../../helper/url';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
const InstructorDashboard = () => {
  const [allocatedCourses, setAllocatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/instructor/courses`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" 
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json(); // Assuming the backend returns a JSON array
        setAllocatedCourses(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Display loading or error message while fetching data
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <Layout>
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 style={{textAlign:"center"}}>Your Allocated Courses</h1>
      <div style={styles.tableContainer}>
        <table className="table" style={styles.table}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Enrolled Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allocatedCourses.length > 0 ? (
              allocatedCourses.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.enrolledStudents}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => window.location.href = `/instructor/course/${course._id}`}
                    >
                      View Course
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No courses allocated</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

const styles = {
  tableContainer: {
    width:"100%",
    display: 'flex',
    justifyContent: 'center', // Center the table horizontally
    alignItems: 'center', // Center the table vertically if needed
    margin: '20px 0', // Add some margin for spacing
  },
  table: {
    width: '100%', // Make the table take full width of the container
    maxWidth: '800px', // Set a max width for the table
    borderCollapse: 'collapse', // Collapse borders for a cleaner look
  },
};

export default InstructorDashboard;