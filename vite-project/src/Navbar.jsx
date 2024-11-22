// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    //logout logic
    navigate('/');
    localStorage.removeItem('userId');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#f0f0f0' }}>
      <a href="/dashboard">Home</a>
      <a href="/history">History</a>
      <a href="/profile">Profile</a>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;