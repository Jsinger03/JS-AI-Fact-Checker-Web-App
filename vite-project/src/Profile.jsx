import React from 'react';
import Navbar from './Navbar';

function Profile() {
    return (
        <div>
            <Navbar />
            <h1>Profile</h1>
            <form>
                <label htmlFor="username">Username: jsinger03</label>
                <input type="text" id="username" name="username" placeholder="new username" />
                <button type="submit">Save</button>
                <br />
                <label htmlFor="email">Email: jsinger03@gmail.com</label>
                <input type="text" id="email" name="email" placeholder="new email" />
                <button type="submit">Save</button>
                <br />
                <label htmlFor="password">Password: not gonna tell you</label>
                <input type="password" id="password" name="password" placeholder="new password" />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Profile;