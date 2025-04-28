// File: src/components/Navbar.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = ({ user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span className="logo-icon">🎒</span>
          <span className="logo-text">Bagpack Drive</span>
        </div>
      </div>
      
      <div className="navbar-right">
        <div className="nav-links">
          <a href="#" className="nav-link active">Files</a>
          <a href="#" className="nav-link">Recent</a>
          <a href="#" className="nav-link">Shared</a>
        </div>
        
        <div className="user-profile" onClick={toggleDropdown}>
          <div className="avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <span className="username">{user.username}</span>
          <span className="dropdown-arrow">▼</span>
          
          {showDropdown && (
            <motion.div 
              className="dropdown-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">👤</span>
                Profile
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">⚙️</span>
                Settings
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">❓</span>
                Help
              </a>
              <div className="dropdown-divider"></div>
              <a onClick={logout} className="dropdown-item logout">
                <span className="dropdown-icon">🚪</span>
                Logout
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;