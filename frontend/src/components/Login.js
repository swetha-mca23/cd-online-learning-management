import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Login.css';
import loginImage from '../assets/img/login.png';
import logo from '../assets/img/image.png';
import url from '../helper/url';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);


      

      if (data?.success) {
        // const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem("role" , data.role)
        toast.success(data?.message)
    
        if (data.role === 'instructor') {
          navigate('/instructor/dashboard'); // Redirect to add course page for instructors
        } else if (data.role === 'student') {
          navigate('/dashboard'); // Redirect to student dashboard
        } else {
          navigate('/admin/dashboard'); // Redirect to admin dashboard
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container */}
      <div className="login-form-container">
        {/* Left side: Form */}
        <div className="form-side">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-heading">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                className="input-field"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            <div className="register-link">
              <span>Don't have an account? </span>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>

        {/* Right side: Image */}
        <div className="image-side">
          <img src={loginImage} alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}
