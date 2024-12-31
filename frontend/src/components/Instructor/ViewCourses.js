import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Layout from './Layout';
import '../../styles/instructor/instructorPage.css';
import url from '../../helper/url';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ViewCourse = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });

  // Fetch course details based on courseId
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/enroll/getByCourseId/${courseId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        setCourseDetails(data);
        setLoading(false);

        // if (!response.ok) {
        //   throw new Error('Failed to fetch course details');
        // }

        
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/homework/${courseId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }

        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        setError('Failed to fetch assignments');
      }
    };

    fetchCourseDetails();
    fetchAssignments();
  }, [courseId]);

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${url}/api/homework`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, ...newAssignment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add assignment');
      }

      const data = await response.json();
       toast.success("Assignment added successfully!")
      setAssignments([...assignments, data]); // Add the new assignment to the list
      setShowAddAssignmentForm(false); // Hide the form
      setNewAssignment({ title: '', description: '', dueDate: '' }); // Reset form
    } catch (err) {
      setError(err.message);
    }
  };

  // Display loading or error message while fetching data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 style={{ color: "blue", textAlign: "center" }}>{courseDetails[0]?.courseId?.courseName}</h1>
      <h2 style={{ textAlign: "center", width: "80%" }}>Enrolled Students</h2>
      <div style={styles.tableContainer}>
        <table className="table" style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {courseDetails.length > 0 ? (
              courseDetails.map((student, index) => (
                <tr key={index}>
                  <td>{student.studentId.userName}</td>
                  <td>{student.studentId.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No users enrolled in this course.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.assignmentsHeader}>
        <h2 style={{ textAlign: "center", width: "80%" }}>Assignments</h2>
        <button className="btn" onClick={() => setShowAddAssignmentForm(!showAddAssignmentForm)}>
          {showAddAssignmentForm ? 'Cancel' : 'Add Assignment/Homework'}
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table className="table" style={styles.table}>
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.title}</td>
                  <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No homework assigned</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddAssignmentForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <ion-icon name="close-circle" style={styles.closeIcon} onClick={() => setShowAddAssignmentForm(false)}></ion-icon>
            <h3 style={styles.modalTitle}>Add Assignment</h3>
            <form onSubmit={handleAddAssignment} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title:</label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Description:</label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Due Date:</label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" className="btn" style={styles.submitButton}>Submit Assignment</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

const styles = {
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  table: {
    width: '80%',
    borderCollapse: 'collapse',
  },
  assignmentsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '20px 0',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    cursor: 'pointer',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: "95%"
  },
  textarea: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
 padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ViewCourse;