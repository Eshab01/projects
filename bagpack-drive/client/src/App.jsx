// File: src/App.jsx
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './styles/App.css';
import { AuthContext } from './context/AuthContext';



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing auth on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('bagpackUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('bagpackUser', JSON.stringify(userData));
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bagpackUser');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading-screen">
      <div className="loading-backpack">
        <img src="/assets/backpack-outline.svg" alt="Loading" />
        <div className="loading-bar"></div>
      </div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="app">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;