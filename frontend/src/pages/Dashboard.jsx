// Dashboard.jsx
// This is the main dashboard page that users see after they login
// It shows stats from the backend and a table of recent bugs
// We use useEffect to fetch data when the page loads and useState to store it

import React, { useEffect, useState } from 'react';
// useNavigate hook - we need this to send the user to different pages
import { useNavigate } from 'react-router-dom';
// this is the axios instance we set up with the backend base URL
import api from '../api/axiosConfig';

function Dashboard() {
  // create navigate function so we can redirect the user
  const navigate = useNavigate();

  // these hold the stats we get back from the backend
  // they start at 0 and get updated once the API call finishes
  const [totalBugs, setTotalBugs] = useState(0);
  const [openBugs, setOpenBugs] = useState(0);
  const [inProgressBugs, setInProgressBugs] = useState(0);
  const [resolvedBugs, setResolvedBugs] = useState(0);

  // this holds the list of recent bugs for the table
  // starts as an empty array until the API gives us data
  const [recentBugs, setRecentBugs] = useState([]);

  // loading state so we can show a message while waiting for data
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component first mounts (because of the empty [] at the end)
  // this is where we call the backend to get dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // make a GET request to /dashboard on our backend
        const response = await api.get('/dashboard');
        // pull out the data from the response and set each piece of state
        setTotalBugs(response.data.totalBugs);
        setOpenBugs(response.data.openBugs);
        setInProgressBugs(response.data.inProgressBugs);
        setResolvedBugs(response.data.resolvedBugs);
        setRecentBugs(response.data.recentBugs);
      } catch (err) {
        // if something goes wrong just log it to the console for now
        console.log('Error fetching dashboard stats:', err);
      } finally {
        // whether it worked or not, stop showing the loading message
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // logout function - clears localStorage and sends user back to the home page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  // helper function that returns a color based on the bug status
  // makes it easy to visually tell statuses apart in the table
  const getStatusColor = (status) => {
    if (status === 'OPEN') return '#cc0000';
    if (status === 'IN_PROGRESS') return '#cc9900';
    if (status === 'RESOLVED') return '#009933';
    return '#999';
  };

  // show a loading message while we wait for the API response
  if (loading) return <p style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Loading dashboard...</p>;

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

        {/* logout button - clears session and takes user back to landing page */}
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
        {/* these cards show a quick summary of bug counts from the backend */}
        {/* the numbers come from the useState variables we set in useEffect */}
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
            {/* the number - now comes from the backend instead of being hardcoded */}
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>{totalBugs}</h3>
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
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>{openBugs}</h3>
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
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>{inProgressBugs}</h3>
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
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>{resolvedBugs}</h3>
            <p style={{ margin: 0, color: '#555555', fontSize: '14px' }}>Resolved</p>
          </div>

        </div>

        {/* ========== RECENT BUGS TABLE ========== */}
        {/* this section shows the latest bug reports from the backend */}
        {/* recentBugs is an array we got from the /dashboard endpoint */}
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
          <tbody>
            {/* if there are no recent bugs, show a placeholder message */}
            {/* otherwise loop through the recentBugs array and make a row for each one */}
            {recentBugs.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#999999', fontSize: '14px' }}>
                  No bugs reported yet.
                </td>
              </tr>
            ) : (
              // .map() loops through each bug and creates a table row
              // the key prop helps React keep track of which row is which
              recentBugs.map((bug) => (
                <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.id}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.title}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.severity}</td>
                  {/* status gets a colored background so its easy to spot */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    <span style={{
                      padding: '3px 8px',
                      color: 'white',
                      backgroundColor: getStatusColor(bug.status),
                      fontSize: '13px',
                    }}>
                      {bug.status}
                    </span>
                  </td>
                  {/* show the date the bug was created, formatted nicely */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    {new Date(bug.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

// export so other files can import this component
export default Dashboard;
