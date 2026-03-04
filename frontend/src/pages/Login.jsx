// Login - this is the login page where users enter their username and password
import React, { useState } from 'react';

function Login() {
  // useState lets us store the values the user types into the form fields
  // username stores what the user types in the username input
  const [username, setUsername] = useState('');
  // password stores what the user types in the password input
  const [password, setPassword] = useState('');

  // this function runs when the user clicks the submit button
  // e.preventDefault() stops the page from reloading (default form behavior)
  const handleSubmit = (e) => {
    e.preventDefault();
    // for now just log the values - we'll connect this to the backend later
    console.log('Login attempt:', username, password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {/* Login form container - centered on the page */}
      <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: '#f5f5f5', borderRadius: '8px', width: '300px' }}>
        {/* Form title */}
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        {/* Username input field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Password input field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {/* Submit button - sends the form data when clicked */}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
