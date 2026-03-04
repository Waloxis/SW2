// Dashboard - this is the main page users see after logging in
// it shows stats about bugs and a table of recent bug reports
import React from 'react';
// useNavigate lets us redirect the user to other pages when they click buttons
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  // create a navigate function so we can send the user to other routes
  const navigate = useNavigate();

  // this function logs the user out and sends them back to the landing page
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Navbar - same style as the landing page to keep things consistent */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
        {/* App name on the left */}
        <h1 style={{ margin: 0, fontSize: '20px' }}>Bug Tracker</h1>
        {/* Logout button on the right - sends user back to the landing page */}
        <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* Main content area - has some padding so things aren't right against the edges */}
      <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Welcome section - greets the user when they land on the dashboard */}
        <h2 style={{ fontSize: '28px', marginBottom: '5px' }}>Welcome back!</h2>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
          Here is what is going on with your projects today.
        </p>

        {/* Stats cards section - shows a quick overview of bug counts */}
        {/* All values are 0 for now since the backend is not connected yet */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>

          {/* Card 1 - Total Bugs */}
          <div style={{ flex: '1', minWidth: '150px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #3498db' }}>
            <h3 style={{ fontSize: '32px', margin: '0 0 5px 0' }}>0</h3>
            <p style={{ margin: 0, color: '#555' }}>Total Bugs</p>
          </div>

          {/* Card 2 - Open bugs that haven't been worked on yet */}
          <div style={{ flex: '1', minWidth: '150px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #e74c3c' }}>
            <h3 style={{ fontSize: '32px', margin: '0 0 5px 0' }}>0</h3>
            <p style={{ margin: 0, color: '#555' }}>Open</p>
          </div>

          {/* Card 3 - Bugs that are currently being worked on */}
          <div style={{ flex: '1', minWidth: '150px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #f39c12' }}>
            <h3 style={{ fontSize: '32px', margin: '0 0 5px 0' }}>0</h3>
            <p style={{ margin: 0, color: '#555' }}>In Progress</p>
          </div>

          {/* Card 4 - Bugs that have been fixed */}
          <div style={{ flex: '1', minWidth: '150px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center', borderLeft: '4px solid #2ecc71' }}>
            <h3 style={{ fontSize: '32px', margin: '0 0 5px 0' }}>0</h3>
            <p style={{ margin: 0, color: '#555' }}>Resolved</p>
          </div>

        </div>

        {/* Recent Bugs section - shows a table of the latest bug reports */}
        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Recent Bugs</h3>

        {/* Table to display bug reports - no rows yet since backend isn't connected */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {/* Table header - defines the column names */}
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Severity</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          {/* Table body - empty for now, just shows a placeholder message */}
          <tbody>
            <tr>
              <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                No bugs reported yet.
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Dashboard;
