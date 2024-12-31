import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/img/l2.png';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

export default function StudentSidebar({ setActivePage }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const menuItems = [
        { name: "grid-outline", label: "Dashboard", path: "/dashboard" },
        { name: "book-outline", label: "MyCourses", path: "/my-course" },
        { name: "clipboard-outline", label: "Homework", path: "/homework" },
        { name: "settings-outline", label: "Settings", path: "/settings" },
    ];

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        // Navigate to the root URL
        navigate('/'); // Change this to your desired root URL
    };

    return (
        <div style={styles.sidebar}>
            <ToastContainer position="top-center" autoClose={3000} />
            <div style={styles.logoContainer}>
                <img src={image} alt="Sidebar Logo" style={styles.logo} />
            </div>
            <div style={styles.menu}>
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        style={{
                            ...styles.menuItem,
                            backgroundColor: hoveredIndex === index ? '#0F52BA' : 'transparent',
                            textDecoration: 'none',
                            color: hoveredIndex === index ? '#fff' : '#000',
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setActivePage(item.label)}
                    >
                        <ion-icon
                            name={item.name}
                            style={{
                                ...styles.icon,
                                color: hoveredIndex === index ? '#fff' : '#000',
                            }}
                        ></ion-icon>
                        <p
                            style={{
                                ...styles.text,
                                color: hoveredIndex === index ? '#fff' : '#000',
                                padding: 0
                            }}
                        >
                            {item.label}
                        </p>
                    </Link>
                ))}
            </div>
            <div style={styles.logoutContainer}>
                <div
                    style={{
                        ...styles.menuItem,
                        ...styles.logout,
                        backgroundColor: hoveredIndex === 'logout' ? '#0F52BA' : '#dceff1',
                        textDecoration: 'none',
                        color: hoveredIndex === 'logout' ? '#fff' : '#000',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => setHoveredIndex('logout')}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={handleLogout} // Call handleLogout on click
                >
                    <ion-icon
                        name="log-out-outline"
                        style={{
                            ...styles.icon,
                            color: hoveredIndex === 'logout' ? '#fff' : '#000',
                        }}
                    ></ion-icon>
                    <p
                        style={{
                            ...styles.text,
                            color: hoveredIndex === 'logout' ? '#fff' : '#000',
                            padding: 0
                        }}
                    >
                        Logout
                    </p>
                </div>
            </div>
        </div>
    );
}

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