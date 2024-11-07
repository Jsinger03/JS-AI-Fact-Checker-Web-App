// vite-project/src/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ username }) {
  const [inputType, setInputType] = useState('link');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here, e.g., clearing tokens, etc.
    navigate('/');
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#f0f0f0' }}>
        <a href="/">Home</a>
        <a href="/history">History</a>
        <a href="/profile">Profile</a>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <h1>Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <p>This is your dashboard</p>

      <div>
        <label>
          <input
            type="radio"
            value="link"
            checked={inputType === 'link'}
            onChange={() => setInputType('link')}
          />
          Link
        </label>
        <label>
          <input
            type="radio"
            value="text"
            checked={inputType === 'text'}
            onChange={() => setInputType('text')}
          />
          Text
        </label>
      </div>

      {inputType === 'link' ? (
        <input
          type="url"
          placeholder="Enter URL"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: '300px', margin: '10px 0' }}
        />
      ) : (
        <textarea
          placeholder="Enter text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: '300px', height: '100px', margin: '10px 0' }}
        />
      )}
    </div>
  );
}

export default Dashboard;