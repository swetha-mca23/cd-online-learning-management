import React, { useEffect, useState } from "react";
import "../../styles/Admin/Dashboard.css";
import AdminHeader from "./AdminHeader";
import url from "../../helper/url";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    
    const fetchCounts = async () => {
      try {
        const studentResponse = await fetch(`${url}/auth/students/count`);
        const instructorResponse = await fetch(`${url}/auth/instructors/count`);
        const courseResponse = await fetch(`${url}/api/count`);
        

        if (!studentResponse.ok || !instructorResponse.ok || !courseResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const studentData = await studentResponse.json();
        const instructorData = await instructorResponse.json();
        const courseData = await courseResponse.json();
        setStudentCount(studentData.count);
        setInstructorCount(instructorData.count);
        setCourseCount(courseData.count);
        console.log(studentData);
        
        
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchCounts();
  }, []); 

  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="main-content">
      <ToastContainer position="top-center" autoClose={3000} />
        <div className="dashboard-container">
          <h1>Admin Dashboard</h1>
          <div className="dashboard-stats">
            <div className="stat-card">Total Students: {studentCount}</div>
            <div className="stat-card">Total Instructors: {instructorCount}</div>
            <div className="stat-card">Total Courses: {courseCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
