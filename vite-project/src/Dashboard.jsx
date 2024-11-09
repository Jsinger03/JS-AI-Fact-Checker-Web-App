// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard({ username }) {
  //https://www.w3schools.com/react/react_usestate.asp
  const [inputType, setInputType] = useState('link');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  //https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    } else {
        navigate('/');
    }
}, [navigate]);
  const handleSubmit = async () => {
    //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
    event.preventDefault();
    try {
        const response = await fetch('/api/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                prompt: inputValue,
            }),
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Query submitted:', result.message);
          navigate(`/results/${result.queryId}`);
        } else {
            console.error('Error submitting query:', result.message);
        }
      } catch (error) {
          console.error('Error submitting query:', error);
      }
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <p>This is your dashboard</p>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" style={{ display: 'block', marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Dashboard;