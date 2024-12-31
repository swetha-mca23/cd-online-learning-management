import React, { useState } from 'react';
import StudentSidebar from './StudentSidebar';
import MyCourses from './MyCourses';
import NewCourses from './newCourses';
import Settings from './Settings';
import StudentDashboard from './StudentDashboard';
import Homework from './StudentHOmework';
import StudentSettings from './Settings';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function HomePage() {
  const [activePage, setActivePage] = useState('');
  console.log(activePage);
  

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <StudentDashboard />;
      case 'MyCourses':
        return <MyCourses />;
      case 'newCourses':
        return <NewCourses />;
      case 'Settings':
        return <StudentSettings />;
      case 'Homework':
        return <Homework/>;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div style={styles.sidebar}>
        <StudentSidebar setActivePage={setActivePage} />
      </div>
      <div style={styles.content}>
        {renderPage()}  
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', // Ensures children are aligned horizontally
    height: '100vh', // Full viewport height
    width: '100%', // Full viewport width
    overflow: 'hidden', // Prevents content overflow
  },
  sidebar: {
    flex: '0 0 250px', // Sidebar takes a fixed width of 250px
    height: '100%', // Full height
    backgroundColor: '#f4f4f4', // Background color for clarity
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Shadow for distinction
  },
  content: {
    flex: 1, // Content takes the remaining space
    padding: '20px', // Padding around the content
    height: '100%', // Full height
    // overflowY: 'auto', // Enables vertical scrolling if content overflows
    boxSizing: 'border-box', // Ensures padding is included in height calculation
  },
};