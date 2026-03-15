// Dashboard.jsx
// This is the main dashboard page that users see after they login
// It shows some stats and a table of recent bugs
// I followed the Coursera React course structure for this
// TODO: connect this to the backend API later

import React from 'react';
// useNavigate hook - we need this to send the user to different pages
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // create navigate function so we can redirect the user
  const navigate = useNavigate();

  // logout function - sends user back to the home page
  // later we will also clear the auth token here
  const handleLogout = () => {
    navigate('/');
  };

  return (
    // main wrapper div
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>

      {/* ========== NAVBAR ========== */}
      {/* navigation bar - same style as the landing page */}
      {/* I used flexbox to put the title on the left and button on the right */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 25px',
        backgroundColor: '#f0f0f0',
        borderBottom: '2px solid #cccccc',
      }}>
        {/* app name */}
        <h1 style={{ margin: 0, fontSize: '22px', color: '#0066cc' }}>
          Bug Tracker
        </h1>

        {/* logout button - takes user back to landing page */}
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 18px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: '1px solid #0066cc',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Logout
        </button>
      </nav>

      {/* ========== MAIN CONTENT ========== */}
      {/* this div holds all the dashboard content */}
      {/* I used maxWidth so it doesnt get too wide on big monitors */}
      <div style={{ padding: '25px 30px', maxWidth: '900px', margin: '0 auto' }}>

        {/* ========== WELCOME SECTION ========== */}
        {/* greeting message for the user */}
        <h2 style={{
          fontSize: '26px',
          marginBottom: '5px',
          color: '#222222',
        }}>
          Welcome back!
        </h2>
        {/* subtitle text */}
        <p style={{
          fontSize: '15px',
          color: '#555555',
          marginBottom: '28px',
        }}>
          Here is what is going on with your projects today.
        </p>

        {/* ========== STATS CARDS ========== */}
        {/* these cards show a quick summary of bug counts */}
        {/* all values are 0 because backend is not connected yet */}
        {/* I used flexbox to put them in a row */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '35px',
          flexWrap: 'wrap',
        }}>

          {/* Card 1 - Total Bugs */}
          {/* I added a colored top border to each card so you can tell them apart */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '18px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #0066cc',
            textAlign: 'center',
          }}>
            {/* the number */}
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>0</h3>
            {/* label */}
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>Total Bugs</p>
          </div>

          {/* Card 2 - Open bugs */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #cc0000',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>0</h3>
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>Open</p>
          </div>

          {/* Card 3 - In Progress bugs */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '22px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #cc9900',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>0</h3>
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>In Progress</p>
          </div>

          {/* Card 4 - Resolved bugs */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '18px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #009933',
            textAlign: 'center',
          }}>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>0</h3>
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>Resolved</p>
          </div>

        </div>

        {/* ========== RECENT BUGS TABLE ========== */}
        {/* this section shows the latest bug reports in a table */}
        {/* the table is empty right now because we dont have backend data yet */}
        <h3 style={{
          fontSize: '20px',
          marginBottom: '12px',
          color: '#333333',
        }}>
          Recent Bugs
        </h3>

        {/* bug reports table */}
        {/* I used borderCollapse so the borders dont double up */}
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #cccccc',
        }}>
          {/* table header row */}
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Title</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Severity</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Date</th>
            </tr>
          </thead>
          {/* table body - no data yet so we show a message */}
          <tbody>
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999999', fontSize: '14px' }}>
                No bugs reported yet.
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

// export so other files can import this component
export default Dashboard;
