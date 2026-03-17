// BugList.jsx
// this page shows all the bugs in a table
// different users see different stuff depending on their role
// TODO: still need to test this with real data

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function BugList() {
  const navigate = useNavigate();

  // state for the bug data
  const [bugs, setBugs] = useState([]);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // this runs when the page first loads
  // it checks the role and then gets the bugs
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRole(savedRole);
    fetchBugs();
  }, [navigate]);

  // get all bugs from the backend
  const fetchBugs = async () => {
    try {
      const response = await api.get('/bugs');
      setBugs(response.data.content);
    } catch (err) {
      console.log('Error fetching bugs:', err);
      setError('Failed to load bugs. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // this lets developers change the status of a bug
  const handleStatusChange = async (bugId, newStatus) => {
    try {
      await api.put(`/bugs/${bugId}`, { status: newStatus });
      // reload the list after updating
      fetchBugs();
    } catch (err) {
      console.log('Error updating status:', err);
      alert('Could not update bug status.');
    }
  };

  // returns a color for the status text
  const getStatusColor = (status) => {
    if (status === 'OPEN') return '#cc0000';
    if (status === 'IN_PROGRESS') return '#cc9900';
    if (status === 'RESOLVED') return '#009933';
    if (status === 'APPROVED') return '#0066cc';
    return '#999';
  };

  // show loading text while we wait
  if (loading) return <p>Loading bugs...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bug Reports</h1>
        {/* back button */}
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </div>

      {/* error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* if theres no bugs show a message */}
      {bugs.length === 0 ? (
        <p>No bugs reported yet.</p>
      ) : (
        // bug table
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', border: '1px solid #cccccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Severity</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Assigned To</th>
              {/* developers get an extra column */}
              {role === 'developer' && <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid #ccc', fontSize: '14px' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{bug.id}</td>
                <td style={{ padding: '12px' }}>{bug.title}</td>
                <td style={{ padding: '12px' }}>{bug.severity}</td>
                <td style={{ padding: '12px' }}>
                  {/* colored status text */}
                  <span style={{
                    padding: '3px 8px',
                    color: 'white',
                    backgroundColor: getStatusColor(bug.status),
                    fontSize: '13px',
                  }}>
                    {bug.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{bug.assignedTo || 'Unassigned'}</td>

                {/* buttons for developers to change status */}
                {role === 'developer' && (
                  <td style={{ padding: '12px' }}>
                    {bug.status === 'OPEN' && (
                      <button
                        onClick={() => handleStatusChange(bug.id, 'IN_PROGRESS')}
                        style={{ padding: '5px 10px', backgroundColor: '#cc9900', color: 'white', border: 'none', cursor: 'pointer' }}
                      >
                        Start Working
                      </button>
                    )}
                    {bug.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleStatusChange(bug.id, 'RESOLVED')}
                        style={{ padding: '5px 10px', backgroundColor: '#009933', color: 'white', border: 'none', cursor: 'pointer' }}
                      >
                        Mark Resolved
                      </button>
                    )}
                    {(bug.status === 'RESOLVED' || bug.status === 'APPROVED') && (
                      <span style={{ color: '#999' }}>No action needed</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BugList;
