import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const result = await response.json();
        console.log(response)
        if (response.ok) {
          setMessage(result.message);
          // Redirect to another page or perform other actions on successful login
          console.log('Login successful:', result);
          // Redirect to the dashboard
          navigate('/dashboard');
        } else {
          setMessage(result.message);
          console.log('Login failed:', result);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setMessage('An error occurred. Please try again.');
      }
    };
    return (
        <div>
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    }

export default Login;