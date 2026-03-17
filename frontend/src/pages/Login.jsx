// Login.jsx
// this is the login page where users type their username and password
// right now it doesnt actually talk to the backend yet

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // these keep track of what the user types in
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // TEMPORARY: fake login for testing, replace with real API call later
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== '' && password.trim() !== '') {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', username.trim());
      navigate('/dashboard');
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: '#f5f5f5', border: '1px solid #cccccc', width: '300px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>
        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer', fontSize: '16px' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;