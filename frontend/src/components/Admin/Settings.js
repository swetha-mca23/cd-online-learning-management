import React, { useEffect, useState } from "react";
import "../../styles/Admin/Settings.css";
import AdminHeader from "./AdminHeader";
import url from "../../helper/url";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Settings = () => {

  const [isProfileFormVisible, setProfileFormVisible] = useState(false);
  const [isPasswordFormVisible, setPasswordFormVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/auth/users/me`, { // Adjust the endpoint as necessary
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log("user",data);
        
        // if (data.success) {
          setUserName(data?.userName); // Assuming the user object has a username field
          setEmail(data?.email); // Assuming the user object has an email field
        // } else {
        //   console.error('Error fetching user details:', data.message);
        // }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array means this runs once when the component mounts

  const toggleProfileForm = () => {
    setProfileFormVisible(!isProfileFormVisible);
  };

  const togglePasswordForm = () => {
    setPasswordFormVisible(!isPasswordFormVisible);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/auth/users/update-profile`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userName, email }),
      });

      const data = await response.json();
      // if (data.success) {
        toast.success("Profile updated successfully!")
        console.log('Profile updated successfully:', data);
        toggleProfileForm(); // Close the form after successful update
      // } else {
      //   console.error('Error updating profile:', data.message);
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/auth/users/change-password`, { 
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      toast.success("Password changed successfully!")
      // if (data.success) {
        console.log('Password changed successfully:', data);
        togglePasswordForm(); // Close the form after successful change
      // } else {
      //   console.error('Error changing password:', data.message);
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="main-content">
      <ToastContainer position="top-center" autoClose={3000} />
        <div className="settings-container">
          <h1>Admin Settings</h1>
          <div className="settings-section">
            <h2>Profile Settings</h2>
            <p>Update your personal information and change your profile details.</p>
            <button style={styles.updateProfileBtn} onClick={toggleProfileForm}>
            Update Profile
          </button>
          </div>

          <div className="settings-section">
            <h2>Security Settings</h2>
            <p>Change your password and manage login security options.</p>
            <button style={styles.changePasswordBtn} onClick={togglePasswordForm}>
            Change Password
          </button>
          </div>
        </div>
      </div>
      {isProfileFormVisible && (
        <Overlay>
          <ProfileForm 
            onClose= {toggleProfileForm} 
            userName={userName} 
            setUsername={setUserName} 
            email={email} 
            setEmail={setEmail} 
            handleUpdateProfile={handleUpdateProfile} 
          />
        </Overlay>
      )}

      {isPasswordFormVisible && (
        <Overlay>
          <PasswordForm 
            onClose={togglePasswordForm} 
            currentPassword={currentPassword} 
            setCurrentPassword={setCurrentPassword} 
            newPassword={newPassword} 
            setNewPassword={setNewPassword} 
            handleChangePassword={handleChangePassword} 
          />
        </Overlay>
      )}
    </div>
  );
};

const Overlay = ({ children }) => {
  return (
    <div style={overlayStyles.overlay}>
      <div style={overlayStyles.content}>
        {children}
      </div>
    </div>
  );
};

const ProfileForm = ({ onClose, userName, setUsername, email, setEmail, handleUpdateProfile }) => {
  console.log("username" , userName);
  
  return (
    <div style={formStyles.container}>
      <div style={{display:"flex" , alignItems:"center" , justifyContent:"space-between"}}>
      <h2>Update Profile</h2>
      <ion-icon
        name="close"
        style={{ color: 'black', fontSize: '24px', marginRight: '2px', cursor: 'pointer' }}
        onClick={onClose}
      ></ion-icon>
      </div>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="userName"
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={formStyles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={formStyles.input}
        />
        <button type="submit" style={formStyles.submitButton}>Update</button>
      </form>
    </div>
  );
};

const PasswordForm = ({ onClose, currentPassword, setCurrentPassword, newPassword, setNewPassword, handleChangePassword }) => {
  return (
    <div style={formStyles.container}>
      <div style={{display:"flex" , alignItems:"center" , justifyContent:"space-between" , width:"100%"}}>
      <h2>Change Password</h2>
      <ion-icon
        name="close"
        style={{ color: 'black', fontSize: '24px', marginRight: '2px', cursor: 'pointer' }}
        onClick={onClose}
      ></ion-icon>
      </div>
     
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={formStyles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={formStyles.input}
        />
        <button type="submit" style={formStyles.submitButton}>Change Password</button>
      </form>
    </div>
  );
};

const overlayStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: ' center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
  },
};

const formStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: '10px 0',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 15px',
    backgroundColor: '#0F52BA',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const styles = {
  mainContent: {
    padding: '20px',
  },
  settingsContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  settingsSection: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    backgroundColor: '#f1f1f1',
  },
  sectionHeader: {
    margin: '0 0 10px 0',
    color: '#0F52BA',
  },
  sectionDescription: {
    margin: '0 0 10px 0',
    color: '#555',
  },
  updateProfileBtn: {
    padding: '10px 15px',
    backgroundColor: '#0F52BA',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  changePasswordBtn: {
    padding: '10px 15px',
    backgroundColor: '#0F52BA',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Settings;
