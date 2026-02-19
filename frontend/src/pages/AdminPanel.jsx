// AdminPanel.jsx — this page is only for admins
// admins can:
//   1. assign bugs to developers
//   2. approve bugs that developers have marked as resolved

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function AdminPanel() {
  const navigate = useNavigate();

  // state for our data
  const [bugs, setBugs] = useState([]);             // all bug reports
  const [developers, setDevelopers] = useState([]);  // list of developer users (for the assign dropdown)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // check that the user is actually an admin before showing this page
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      // if they're not an admin, kick them back to the dashboard
      alert('Access denied. Admins only!');
      navigate('/dashboard');
      return;
    }

    // fetch both bugs and developers at the same time
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      // Promise.all lets us make two API calls at the same time instead of waiting
      // for one to finish before starting the other — it's faster this way
      const [bugsResponse, devsResponse] = await Promise.all([
        api.get('/bugs'),
        api.get('/users/developers'),
      ]);

      setBugs(bugsResponse.data);
      setDevelopers(devsResponse.data);
    } catch (err) {
      console.log('Error loading admin data:', err);
      setError('Failed to load data. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // this function assigns a bug to a developer
  // the admin picks a developer from the dropdown and we send it to the backend
  const handleAssign = async (bugId, developerId) => {
    if (!developerId) return; // do nothing if they picked the blank option

    try {
      await api.put(`/bugs/${bugId}/assign`, { developerId });
      // refresh the bug list to show the updated assignment
      loadData();
    } catch (err) {
      console.log('Error assigning bug:', err);
      alert('Could not assign bug.');
    }
  };

  // this function approves a resolved bug
  // only bugs with status "RESOLVED" can be approved
  const handleApprove = async (bugId) => {
    try {
      await api.put(`/bugs/${bugId}/approve`);
      // refresh after approving
      loadData();
    } catch (err) {
      console.log('Error approving bug:', err);
      alert('Could not approve bug.');
    }
  };

  // helper to get a color for each status (same as BugList)
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return '#e74c3c';
      case 'IN_PROGRESS': return '#f39c12';
      case 'RESOLVED': return '#2ecc71';
      case 'APPROVED': return '#3498db';
      default: return '#999';
    }
  };

  if (loading) return <p>Loading admin panel...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Panel</h1>
        <button onClick={() => navigate('/dashboard')} style={backButtonStyle}>
          Back to Dashboard
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bugs.length === 0 ? (
        <p>No bugs in the system yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Severity</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Assign To Developer</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{bug.id}</td>
                <td style={tdStyle}>{bug.title}</td>
                <td style={tdStyle}>{bug.severity}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: 'white',
                    backgroundColor: getStatusColor(bug.status),
                    fontSize: '13px',
                  }}>
                    {bug.status}
                  </span>
                </td>

                {/* dropdown to assign a developer to this bug */}
                <td style={tdStyle}>
                  <select
                    onChange={(e) => handleAssign(bug.id, e.target.value)}
                    defaultValue=""
                    style={selectStyle}
                  >
                    <option value="">
                      {bug.assignedTo ? bug.assignedTo : '-- Select Developer --'}
                    </option>
                    {developers.map((dev) => (
                      <option key={dev.id} value={dev.id}>
                        {dev.username}
                      </option>
                    ))}
                  </select>
                </td>

                {/* approve button — only shows for resolved bugs */}
                <td style={tdStyle}>
                  {bug.status === 'RESOLVED' ? (
                    <button onClick={() => handleApprove(bug.id)} style={approveButtonStyle}>
                      Approve Fix
                    </button>
                  ) : bug.status === 'APPROVED' ? (
                    <span style={{ color: '#3498db', fontWeight: 'bold' }}>Approved</span>
                  ) : (
                    <span style={{ color: '#999' }}>Waiting...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// --- styles ---
const backButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '10px',
};

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '12px',
};

const selectStyle = {
  padding: '6px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const approveButtonStyle = {
  padding: '6px 14px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AdminPanel;
