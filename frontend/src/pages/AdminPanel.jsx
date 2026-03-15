// AdminPanel.jsx
// this is the admin page where admins can assign bugs and approve fixes
// only admins should be able to see this page

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function AdminPanel() {
  const navigate = useNavigate();

  // these variables keep track of the data on this page
  const [bugs, setBugs] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // check if the user is an admin first
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access denied. Admins only!');
      navigate('/dashboard');
      return;
    }

    loadData();
  }, [navigate]);

  // gets the bugs and the list of developers from the backend
  const loadData = async () => {
    try {
      // I used Promise.all here so both requests happen at once
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

  // when the admin picks a developer from the dropdown it calls this
  const handleAssign = async (bugId, developerId) => {
    if (!developerId) return;

    try {
      await api.put(`/bugs/${bugId}/assign`, { developerId });
      loadData();
    } catch (err) {
      console.log('Error assigning bug:', err);
      alert('Could not assign bug.');
    }
  };

  // approves a bug that a developer already resolved
  const handleApprove = async (bugId) => {
    try {
      await api.put(`/bugs/${bugId}/approve`);
      loadData();
    } catch (err) {
      console.log('Error approving bug:', err);
      alert('Could not approve bug.');
    }
  };

  // gives back a color depending on the status
  const getStatusColor = (status) => {
    if (status === 'OPEN') return '#cc0000';
    if (status === 'IN_PROGRESS') return '#cc9900';
    if (status === 'RESOLVED') return '#009933';
    if (status === 'APPROVED') return '#0066cc';
    return '#999';
  };

  if (loading) return <p>Loading admin panel...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Panel</h1>
        {/* go back button */}
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bugs.length === 0 ? (
        <p>No bugs in the system yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', border: '1px solid #cccccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Severity</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Assign To</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{bug.id}</td>
                <td style={{ padding: '12px' }}>{bug.title}</td>
                <td style={{ padding: '12px' }}>{bug.severity}</td>
                <td style={{ padding: '12px' }}>
                  {/* colored status label */}
                  <span style={{
                    padding: '3px 8px',
                    color: 'white',
                    backgroundColor: getStatusColor(bug.status),
                    fontSize: '13px',
                  }}>
                    {bug.status}
                  </span>
                </td>

                {/* developer dropdown */}
                <td style={{ padding: '12px' }}>
                  <select
                    onChange={(e) => handleAssign(bug.id, e.target.value)}
                    defaultValue=""
                    style={{ padding: '6px', border: '1px solid #ccc', width: '100%' }}
                  >
                    <option value="">
                      {bug.assignedTo ? bug.assignedTo : '-- Select --'}
                    </option>
                    {developers.map((dev) => (
                      <option key={dev.id} value={dev.id}>
                        {dev.username}
                      </option>
                    ))}
                  </select>
                </td>

                {/* approve button only shows up if the bug is resolved */}
                <td style={{ padding: '12px' }}>
                  {bug.status === 'RESOLVED' ? (
                    <button onClick={() => handleApprove(bug.id)} style={{ padding: '5px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', cursor: 'pointer' }}>
                      Approve Fix
                    </button>
                  ) : bug.status === 'APPROVED' ? (
                    <span style={{ color: '#0066cc', fontWeight: 'bold' }}>Approved</span>
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

export default AdminPanel;
