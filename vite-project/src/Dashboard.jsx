// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
  //https://www.w3schools.com/react/react_usestate.asp
  const [inputType, setInputType] = useState('link');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [extractedText, setExtractedText] = useState('');

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: inputValue, userId }),
        });
        const data = await response.json();
        if (response.ok) {
            setExtractedText(data.content);
            console.log('Query submitted:', data.queryId);
            navigate(`/results/${data.queryId}`);
        } else {
            console.error('Error extracting text:', data.message);
            alert(`An error occurred: ${data.message}`);
            setExtractedText('Failed to extract content.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`An error occurred: ${error.message}`);
        setExtractedText('An error occurred while fetching content.');
    }
};
  //https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {//load userId from local storage, if not found then return user to login page
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    } else {
        navigate('/');
    }
}, [navigate]);
  useEffect(() => {//load username from local storage, if not found return user to login page
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        setUsername(storedUsername);
    }
  }, [navigate]);
  useEffect(() => {//load userId from local storage, if not found return user to login page
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
        navigate('/');
    }
  }, [inputValue, navigate]);
  const handleSubmit = async (e) => {
    //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
    e.preventDefault();
    if (!userId || !username) {
      alert('You must be logged in to submit a request.');
      navigate('/');
      return;
    }
    if (inputType === 'link') {
      await handleUrlSubmit(e);
    } else {
      try {
        if (inputType === 'text' && inputValue.length > 4000) {
          alert('Text input exceeds the 4000 character limit.');
          return;
        }
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
          alert(`An error occurred: ${result.message}`);
          console.error('Error submitting query:', result.message);
      }
    } catch (error) {
      alert('An error occurred while submitting your query.');
      console.error('Error submitting query:', error);
  }
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {username}</h2>
      <p>This is your dashboard</p>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
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
    </div>
    </>
  );
}

export default Dashboard;