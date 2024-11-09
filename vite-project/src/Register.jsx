import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    //https://www.w3schools.com/react/react_usestate.asp
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage('Registration successful!');
                console.log('Registration successful:', result.message);
                // Save userId to local storage
                localStorage.setItem('userId', result.userId);
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setMessage(result.message);
                console.error('Registration failed:', result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Please enter a username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="email">Please enter your email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Please enter a password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Please confirm your password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <br />
                <label>Already have an account? <a href="/">Login</a></label>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;