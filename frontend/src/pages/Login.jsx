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
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>

      {/* navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 25px',
        backgroundColor: '#e8e8e8',
        borderBottom: '2px solid #cccccc',
      }}>
        <h1 style={{ margin: 0, fontSize: '22px', color: '#0066cc' }}>
          Bug Tracker
        </h1>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 20px',
            backgroundColor: 'white',
            color: '#333',
            border: '1px solid #cccccc',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Back to Home
        </button>
      </nav>

      {/* login form centered in the page */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
        backgroundColor: '#f0f0f0',
      }}>
        <form onSubmit={handleSubmit} style={{
          padding: '40px',
          backgroundColor: 'white',
          border: '1px solid #cccccc',
          width: '340px',
        }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '8px',
            fontSize: '26px',
            color: '#222222',
          }}>
            Sign In
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#555555',
            marginBottom: '25px',
          }}>
            Enter your credentials to access the dashboard.
          </p>

          <hr style={{ width: '60px', border: '1px solid #0066cc', marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto' }} />

          {/* username field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* password field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* error message */}
          {error && (
            <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', marginBottom: '15px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {/* submit button */}
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: '1px solid #0066cc',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
