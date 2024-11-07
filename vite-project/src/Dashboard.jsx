// src/components/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard({ username }) {
  const [inputType, setInputType] = useState('link');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Implement any logic needed before navigating
    navigate('/results');
  };

  return (
    <div>
      <Navbar />
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

      <button onClick={handleSubmit} style={{ display: 'block', marginTop: '10px' }}>
        Submit
      </button>
    </div>
  );
}

export default Dashboard;