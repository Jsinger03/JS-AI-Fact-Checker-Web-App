import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  return (
    <nav className="navbar">
      <a href="/dashboard">Home</a>
      <a href="/history">History</a>
      <a href="/profile">Profile</a>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;