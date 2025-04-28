// File: src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // For demo, simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, you would validate with your backend
      if (formData.username && formData.password) {
        login({ username: formData.username, id: Date.now() });
      } else {
        setError('Please enter both username and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="backpack-animation">
          <img 
            src="/assets/backpack.jpg" 
            alt="Backpack" 
            className="backpack-img"
          />
        </div>
        
        <div className="auth-form-container">
          <h1>Welcome to Bagpack Drive</h1>
          <p className="auth-subtitle">Your personal file storage backpack</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          <p className="auth-redirect">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;