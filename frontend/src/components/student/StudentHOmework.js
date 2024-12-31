import React, { useEffect, useState } from 'react';
import url from '../../helper/url'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Homework() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Fetch homework assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/api/homework`, {
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
        console.log(data);
        
        setAssignments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async (assignmentId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${url}/api/homework/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homeworkId: assignmentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit homework');
      }

      const result = await response.json();

       toast.success("Submission successfully!")
      setSubmissionMessage(result.message || 'Submission successful!');

      // Optionally, you can refresh the assignments to reflect the new submission status
      const updatedAssignments = assignments.map(assignment => 
        assignment._id === assignmentId 
          ? { ...assignment, submissionStatus: 'submitted' } 
          : assignment
      );
      setAssignments(updatedAssignments);
    } catch (err) {
      setSubmissionMessage(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>Homework</h2>
      {/* {submissionMessage && <p>{submissionMessage}</p>} */}
      <div style={{display:"flex" , width:"100%" , flexWrap:"wrap" , gap:"20px"}}>
      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div key={index} style={styles.assignmentCard}>
            <h3 style={{...styles.assignmentTitle , color:"blue" , textAlign:"center"}}>{assignment?.courseId?.courseName}</h3>
            <h4>{assignment.title}</h4>
            <p style={styles.dueDate}>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            <p style={styles.status}>Status: {assignment.submissionStatus || 'Not Submitted'}</p>
            {/* Only show the submit button if the assignment is not submitted */}
            {assignment.submissionStatus !== 'submitted' && (
              <button 
                style={styles.submitButton} 
                onClick={() => handleSubmit(assignment._id)}
              >
                Submit
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No homework assigned</p>
      )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    paddingLeft:"80px"
  },
  assignmentCard: {
    width:"250px",
    backgroundColor: '#ffffff',
    marginBottom: '15px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  assignmentCardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  assignmentTitle: {
    fontSize: '1.5em',
    margin: '0 0 10px 0',
  },
  dueDate: {
    fontSize: '1em',
    color: '#555',
  },
  status: {
    fontSize: '1em',
    color: '#007bff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
     marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};