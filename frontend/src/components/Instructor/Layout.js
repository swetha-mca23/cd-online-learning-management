import React from 'react';
import InstructorSidebar from './InstructorSidebar';
// import './InstructorPage.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <InstructorSidebar/>
      <div style={{width:"80%"}}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
