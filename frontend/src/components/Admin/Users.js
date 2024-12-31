import React, { useState, useEffect } from "react";
import "../../styles/Admin/Users.css";
import AdminHeader from "./AdminHeader";
import url from "../../helper/url";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");  // Username will also be used as the password
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}/auth/getUsers`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);

      setUsers(data.users);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${url}/auth/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
       toast.success("Profile deleted successfully!")
      setUsers(users.filter((user) => user._id !== userId));
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${url}/auth/updateUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }
      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === userId ? updatedUser : user)));
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { userName, email, role, password: userName }; // Use userName as password

    try {
      let response;
      if (currentUser) {

        console.log("edit" , currentUser);
        
        response = await fetch(`${url}/auth/updateUser/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } else {
        response = await fetch(`${url}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save user");
      }
      const user = await response.json();
       toast.success("user added/updated successfully!")
      if (currentUser) {
        setUsers(users.map((u) => (u._id === user._id ? user : u)));
      } else {
        setUsers([...users, user]);
      }
      resetForm();
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setRole("");
    setCurrentUser(null);
  };

  const handleEdit = (user) => {
    setUserName(user.userName);
    setEmail(user.email);
    setRole(user.role);
    setCurrentUser(user);
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-layout">
      <AdminHeader />
      
      <div className="main-content">
      <ToastContainer position="top-center" autoClose={3000} />
        <div className="users-container">
          <h1>Manage Users</h1>
          <button onClick={() => setShowModal(true)}>Add New User</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                color: "black",
                background: "transparent",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <h2>{currentUser ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </select>
              {/* Removed password field */}
              <button type="submit">{currentUser ? "Update" : "Add"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
