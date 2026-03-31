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
  if (loading) return <p style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>Loading bugs...</p>;

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
        <h1 style={{ margin: 0, fontSize: '22px', color: '#0066cc' }}>
          BugTracer
        </h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Dashboard</button>
          <button onClick={() => navigate('/bugs/new')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Submit Bug</button>
          {localStorage.getItem('role') === 'admin' && (
            <button onClick={() => navigate('/admin')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Admin</button>
          )}
          <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{ padding: '8px 18px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
        </div>
      </nav>

      {/* main content */}
      <div style={{ padding: '25px 30px', maxWidth: '1100px', margin: '0 auto' }}>

        <h2 style={{
          fontSize: '26px',
          marginBottom: '5px',
          color: '#222222',
        }}>
          All Bug Reports
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#555555',
          marginBottom: '25px',
        }}>
          View and manage all reported bugs across projects.
        </p>

        {/* error message */}
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', marginBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* if theres no bugs show a message */}
        {bugs.length === 0 ? (
          <p style={{ color: '#555555', fontSize: '14px' }}>No bugs reported yet.</p>
        ) : (
          // bug table
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #cccccc' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>ID</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Title</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Severity</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Assigned To</th>
                {/* developers get an extra column */}
                {role === 'developer' && <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #cccccc', fontSize: '14px', color: '#333333' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.id}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.title}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.severity}</td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>
                    {/* colored status badge */}
                    <span style={{
                      padding: '3px 8px',
                      color: 'white',
                      backgroundColor: getStatusColor(bug.status),
                      fontSize: '13px',
                    }}>
                      {bug.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px', fontSize: '14px' }}>{bug.assignedTo || 'Unassigned'}</td>

                  {/* buttons for developers to change status */}
                  {role === 'developer' && (
                    <td style={{ padding: '10px', fontSize: '14px' }}>
                      {bug.status === 'OPEN' && (
                        <button
                          onClick={() => handleStatusChange(bug.id, 'IN_PROGRESS')}
                          style={{ padding: '5px 10px', backgroundColor: '#cc9900', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Start Working
                        </button>
                      )}
                      {bug.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(bug.id, 'RESOLVED')}
                          style={{ padding: '5px 10px', backgroundColor: '#009933', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px' }}
                        >
                          Mark Resolved
                        </button>
                      )}
                      {(bug.status === 'RESOLVED' || bug.status === 'APPROVED') && (
                        <span style={{ color: '#999', fontSize: '13px' }}>No action needed</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default BugList;
