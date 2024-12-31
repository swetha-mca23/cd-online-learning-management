// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';  // To fetch the course ID from the URL
// import Layout from './Layout';
// import '../../styles/instructor/instructorPage.css';
// import { toast, ToastContainer } from 'react-toastify'; // Import toast components
// import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// const AddAssignment = () => {

//   const { courseId } = useParams();
//   const [assignmentTitle, setAssignmentTitle] = useState('');
//   const [dueDate, setDueDate] = useState('');

//   const handleAddAssignment = () => {
//     alert(`Assignment '${assignmentTitle}' for course ${courseId} added with due date ${dueDate}`);
   
//   };

//   return (
//     <Layout>
//       <ToastContainer position="top-center" autoClose={3000} />
//       <h1>Add Assignment/Homework for Course {courseId}</h1>
//       <div>
//         <label>Assignment Title:</label>
//         <input
//           type="text"
//           value={assignmentTitle}
//           onChange={(e) => setAssignmentTitle(e.target.value)}
//           className="input-field"
//         />
//       </div>
//       <div>
//         <label>Due Date:</label>
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="input-field"
//         />
//       </div>
//       <button className="btn" onClick={handleAddAssignment}>
//         Add Assignment
//       </button>
//     </Layout>
//   );
// };

// export default AddAssignment;
