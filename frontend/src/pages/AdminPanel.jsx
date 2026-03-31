// AdminPanel.jsx
// this is the admin-only page where you can see all bugs, change their status,
// and assign them to developers
// the assign and users list features are placeholders for now until the backend builds those endpoints

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function AdminPanel() {
  const navigate = useNavigate();

  // holds the list of bugs we get from the backend
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // runs when the page first loads
  useEffect(() => {
    // if the user isnt an admin send them back to the dashboard
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Admins only!');
      navigate('/dashboard');
      return;
    }

    loadBugs();
  }, [navigate]);

  // fetches all bugs from the backend
  const loadBugs = async () => {
    try {
      const response = await api.get('/bugs');
      // backend returns paginated data so we need .content to get the array
      setBugs(response.data.content);
    } catch (err) {
      console.log('Error loading bugs:', err);
      setError('Could not load bugs. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // PLACEHOLDER - this will call the real assign endpoint once backend builds it
  const handleAssign = (bugId, developer) => {
    alert(`Assign feature coming soon. Bug ${bugId} would be assigned to ${developer}`);
  };

  // PLACEHOLDER - this will call the real status update endpoint once backend builds it
  const handleStatusChange = (bugId, newStatus) => {
    alert(`Status change coming soon. Bug ${bugId} would be changed to ${newStatus}`);
  };

  // returns a color based on bug status for the status badge
  const getStatusColor = (status) => {
    if (status === 'OPEN') return '#cc0000';
    if (status === 'IN_PROGRESS') return '#cc9900';
    if (status === 'RESOLVED') return '#009933';
    return '#999';
  };

  if (loading) return <p style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Loading admin panel...</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>

      {/* navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 25px',
        backgroundColor: '#f0f0f0',
        borderBottom: '2px solid #cccccc',
      }}>
        <h1 style={{ margin: 0, fontSize: '22px', color: '#0066cc' }}>Bug Tracker</h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Dashboard</button>
          <button onClick={() => navigate('/bugs')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Bugs</button>
          <button onClick={() => navigate('/bugs/new')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Submit Bug</button>
          <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{ padding: '8px 18px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '25px 30px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* ====== STATS SECTION ======
            this section shows 3 stat cards at the top of the admin panel
            we count the bugs client-side from the bugs array we already fetched
            so we dont need any extra API calls for this */}
        <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Overview</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>

          {/* total bugs card - just the length of the whole array */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '18px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #0066cc',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>Total Bugs</p>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>
              {bugs.length}
            </h3>
          </div>

          {/* open bugs card - filter the array for OPEN status and count */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #cc0000',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>Open Bugs</p>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>
              {bugs.filter((b) => b.status === 'OPEN').length}
            </h3>
          </div>

          {/* in progress bugs card - filter for IN_PROGRESS status and count */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '22px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #cc9900',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>In Progress</p>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>
              {bugs.filter((b) => b.status === 'IN_PROGRESS').length}
            </h3>
          </div>

          {/* resolved bugs card - filter for RESOLVED status and count */}
          <div style={{
            flex: '1',
            minWidth: '150px',
            padding: '18px',
            backgroundColor: 'white',
            border: '1px solid #cccccc',
            borderTop: '4px solid #009933',
            textAlign: 'center',
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>Resolved Bugs</p>
            <h3 style={{ fontSize: '30px', margin: '0 0 5px 0', color: '#0066cc' }}>
              {bugs.filter((b) => b.status === 'RESOLVED').length}
            </h3>
          </div>

        </div>

        {/* ====== BUGS TABLE SECTION ======
            this is the main bugs table that was already here
            it lists every bug from the backend with options to assign and change status */}
        <h2 style={{ fontSize: '22px', marginBottom: '5px' }}>All Bug Reports</h2>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
          Oversee bugs.
        </p>

        {/* show error if backend call failed */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* bugs table */}
        {bugs.length === 0 ? (
          <p>No bugs in the system yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #cccccc' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>ID</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Title</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Severity</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Assign To</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.id}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.title}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.severity}</td>

                  {/* colored status badge */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    <span style={{ padding: '3px 8px', color: 'white', backgroundColor: getStatusColor(bug.status), fontSize: '13px' }}>
                      {bug.status}
                    </span>
                  </td>

                  {/* assign to - placeholder dropdown for now */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    <select
                      onChange={(e) => handleAssign(bug.id, e.target.value)}
                      defaultValue=""
                      style={{ padding: '5px', border: '1px solid #ccc' }}
                    >
                      <option value="">-- Assign --</option>
                      {/* placeholder options until backend has real user list */}
                      <option value="developer1">Developer 1</option>
                      <option value="developer2">Developer 2</option>
                    </select>
                  </td>

                  {/* change status - placeholder buttons for now */}
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    <select
                      onChange={(e) => handleStatusChange(bug.id, e.target.value)}
                      defaultValue={bug.status}
                      style={{ padding: '5px', border: '1px solid #ccc' }}
                    >
                      <option value="OPEN">Open</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ====== USERS & DEVELOPERS SECTION ======
            this section shows a table of users and developers in the system
            RIGHT NOW this is all hardcoded fake data for display purposes
            TODO: replace this with real data from the backend user list API once that endpoint is ready */}
        <h2 style={{ fontSize: '22px', marginTop: '40px', marginBottom: '5px' }}>Users &amp; Developers</h2>
        <p style={{ color: '#555', fontSize: '14px', marginBottom: '20px' }}>
          Manage team members and their roles.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #cccccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Username</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Role</th>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* these are fake rows - will be replaced with real API data later */}
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '14px' }}>developer1</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>Developer</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>
                <span style={{ padding: '3px 8px', color: 'white', backgroundColor: '#009933', fontSize: '13px' }}>Active</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '14px' }}>developer2</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>Developer</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>
                <span style={{ padding: '3px 8px', color: 'white', backgroundColor: '#009933', fontSize: '13px' }}>Active</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px', fontSize: '14px' }}>admin1</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>Admin</td>
              <td style={{ padding: '10px', fontSize: '14px' }}>
                <span style={{ padding: '3px 8px', color: 'white', backgroundColor: '#009933', fontSize: '13px' }}>Active</span>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminPanel;