import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Admin/AdminHeader.css";

const AdminHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    window.location.href = '/'; // Redirect to login page
  };
  return (
    <aside className="admin-sidebar">
      <nav>
        <ul className="sidebarLinks">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/courses">Courses</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
        </ul>
        <div
                    style={{
                        ...styles.menuItem,
                        ...styles.logout,
                        backgroundColor: '#0F52BA' ,
                        textDecoration: 'none',
                        color: '#fff' ,
                        cursor: 'pointer',
                        margin:"15px"
                    }}
                    // onMouseEnter={() => setHoveredIndex('logout')}
                    // onMouseLeave={() => setHoveredIndex(null)}
                    onClick={handleLogout} // Call handleLogout on click
                >
                    <ion-icon
                        name="log-out-outline"
                        style={{
                            ...styles.icon,
                            // color: hoveredIndex === 'logout' ? '#fff' : '#000',
                        }}
                    ></ion-icon>
                    <p
                        style={{
                            ...styles.text,
                            // color: hoveredIndex === 'logout' ? '#fff' : '#000',
                            padding: 0
                        }}
                    >
                        Logout
                    </p>
                </div>
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
      display: 'flex',
      flexDirection: 'column',
      height: '95vh',
      width: '250px',
      backgroundColor: '#dceff1',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      position: "fixed",
      zIndex: 10,
  },
  logoContainer: {
      textAlign: 'center',
      marginBottom: '20px',
  },
  logo: {
      width: '100px',
  },
  menu: {
      flex: 1,
      overflowY: 'auto',
      paddingRight: '10px',
  },
  menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '5px 5px',
      borderRadius: 5,
      transition: 'background-color 0.3s',
  },
  icon: {
      fontSize: '20px',
      marginRight: '10px',
  },
  text: {
      fontSize: '18px',
      fontWeight: '500',
  },
  logoutContainer: {
      marginTop: '20px',
  },
  logout: {
      backgroundColor : '#dceff1',
  },
};
export default AdminHeader;
