import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/Register.css';
import registerImage from '../assets/img/register.png';
import logo from '../assets/img/image.png';
import url from '../helper/url';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Registration successful!');
        console.log('Response:', result);
      } else {
        const error = await response.json();
        toast.error(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast container */}
      <div className="register-form-container">
        {/* Left side: Image */}
        <div className="image-side">
          <img src={registerImage} alt="Register illustration" />
        </div>

        {/* Right side: Form */}
        <div className="form-side">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="register-heading">Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                name="username"
                className="input-field"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                className="input-field"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-btn">Register</button>
            <div className="login-link">
              <span>Already have an account? </span>
              <Link to="/">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
