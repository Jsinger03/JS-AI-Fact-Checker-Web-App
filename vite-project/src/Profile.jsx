import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Profile() {
    //https://www.w3schools.com/react/react_usestate.asp
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //https://www.w3schools.com/react/react_useeffect.asp
    useEffect(() => {
        //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            try {
                const response = await fetch(`/api/profile/${userId}`);
                const data = await response.json();
                setUsername(data.username);
                setEmail(data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found');
            return;
        }

        try {
            //https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
            const response = await fetch(`/api/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();
            setMessage(result.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="new username"
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="new email"
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="new password"
                />
                <br />
                <button type="submit">Save</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Profile;