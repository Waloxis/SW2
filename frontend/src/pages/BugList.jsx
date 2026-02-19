// BugList.jsx — this page shows all the bug reports in a table
// different roles see different things:
//   - customers see the bugs they submitted
//   - developers see bugs assigned to them and can update the status
//   - admins see everything

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function BugList() {
  const navigate = useNavigate();

  // state variables to hold our data
  const [bugs, setBugs] = useState([]);          // the list of bugs from the backend
  const [role, setRole] = useState('');           // the logged-in user's role
  const [loading, setLoading] = useState(true);   // true while we're fetching data
  const [error, setError] = useState('');         // holds any error messages

  // runs once when the page loads — grabs the role and fetches bugs
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      navigate('/');
      return;
    }
    setRole(savedRole);
    fetchBugs();
  }, [navigate]);

  // calls the backend to get all the bugs
  const fetchBugs = async () => {
    try {
      const response = await api.get('/bugs');
      setBugs(response.data);
    } catch (err) {
      console.log('Error fetching bugs:', err);
      setError('Failed to load bugs. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // developers use this to update a bug's status (e.g. OPEN -> IN_PROGRESS -> RESOLVED)
  const handleStatusChange = async (bugId, newStatus) => {
    try {
      await api.put(`/bugs/${bugId}`, { status: newStatus });
      // after updating, refresh the list so the table shows the new status
      fetchBugs();
    } catch (err) {
      console.log('Error updating status:', err);
      alert('Could not update bug status.');
    }
  };

  // helper function that returns a color based on the bug's status
  // this makes it easy to see which bugs need attention
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return '#e74c3c';           // red — needs attention
      case 'IN_PROGRESS': return '#f39c12';    // orange — someone is working on it
      case 'RESOLVED': return '#2ecc71';       // green — fixed!
      case 'APPROVED': return '#3498db';       // blue — admin approved the fix
      default: return '#999';                  // gray — unknown status
    }
  };

  if (loading) return <p>Loading bugs...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bug Reports</h1>
        <button onClick={() => navigate('/dashboard')} style={backButtonStyle}>
          Back to Dashboard
        </button>
      </div>

      {/* show error message if the API call failed */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* if there are no bugs yet, show a friendly message */}
      {bugs.length === 0 ? (
        <p>No bugs reported yet. That's a good thing!</p>
      ) : (
        // the main table that lists all the bugs
        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Severity</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Assigned To</th>
              {/* developers get an extra column with action buttons */}
              {role === 'developer' && <th style={thStyle}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {bugs.map((bug) => (
              <tr key={bug.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{bug.id}</td>
                <td style={tdStyle}>{bug.title}</td>
                <td style={tdStyle}>{bug.severity}</td>
                <td style={tdStyle}>
                  {/* the status badge shows the status with a matching color */}
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
                <td style={tdStyle}>{bug.assignedTo || 'Unassigned'}</td>

                {/* action buttons for developers to change a bug's status */}
                {role === 'developer' && (
                  <td style={tdStyle}>
                    {bug.status === 'OPEN' && (
                      <button
                        onClick={() => handleStatusChange(bug.id, 'IN_PROGRESS')}
                        style={actionButtonStyle}
                      >
                        Start Working
                      </button>
                    )}
                    {bug.status === 'IN_PROGRESS' && (
                      <button
                        onClick={() => handleStatusChange(bug.id, 'RESOLVED')}
                        style={{ ...actionButtonStyle, backgroundColor: '#2ecc71' }}
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

const actionButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#f39c12',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default BugList;
