import React from 'react';

function Register() {
    return (
        <form method="post">
            <label htmlFor="username">Please enter a username</label>
            <input type="text" name="username" placeholder="username" />
            <label htmlFor="email">Please enter your email</label>
            <input type="text" name="email" placeholder="email" />
            <label htmlFor="password">Please enter a password</label>
            <input type="password" name="password" placeholder="password" />
            <label htmlFor="confirmPassword">Please confirm your password</label>
            <input type="password" name="confirmPassword" placeholder="confirm password" />
            <button type="submit">Register</button>
            <br />
            <label>Already have an account? <a href="/">Login</a></label>
        </form>
    );
}

export default Register;