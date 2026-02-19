// Dashboard.jsx — this is the first page users see after logging in
// it shows a welcome message and quick links depending on the user's role
// roles: "admin", "developer", "customer"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function Dashboard() {
  // useNavigate lets us redirect the user to other pages programmatically
  const navigate = useNavigate();

  // we store the user info and bug stats in state so React re-renders when they change
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component first loads (because of the [] at the end)
  // we use it to grab the logged-in user's info from localStorage
  useEffect(() => {
    // we saved the user's info in localStorage when they logged in
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    // if there's no role, the user probably isn't logged in — send them back to login
    if (!role) {
      navigate('/');
      return;
    }

    setUser({ username, role });

    // fetch some basic stats about bugs from the backend
    fetchStats();
  }, [navigate]);

  // this function calls our backend to get bug counts for the dashboard
  const fetchStats = async () => {
    try {
      const response = await api.get('/bugs');
      const bugs = response.data;

      // we count how many bugs are in each status so we can show numbers on the dashboard
      setStats({
        total: bugs.length,
        open: bugs.filter(b => b.status === 'OPEN').length,
        inProgress: bugs.filter(b => b.status === 'IN_PROGRESS').length,
        resolved: bugs.filter(b => b.status === 'RESOLVED').length,
      });
    } catch (error) {
      console.log('Could not load bug stats:', error);
    } finally {
      // whether it worked or not, we're done loading
      setLoading(false);
    }
  };

  // this logs the user out by clearing their saved data and going back to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/');
  };

  // show a loading message while we wait for data
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* header section with welcome message and logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bug Tracker Dashboard</h1>
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>

      {/* show who is logged in and what role they have */}
      {user && (
        <p style={{ fontSize: '18px', color: '#555' }}>
          Welcome, <strong>{user.username}</strong>! You are logged in as: <strong>{user.role}</strong>
        </p>
      )}

      {/* stats cards — these show a quick overview of bug counts */}
      <div style={statsContainerStyle}>
        <div style={{ ...statCardStyle, borderLeft: '4px solid #3498db' }}>
          <h3>{stats.total}</h3>
          <p>Total Bugs</p>
        </div>
        <div style={{ ...statCardStyle, borderLeft: '4px solid #e74c3c' }}>
          <h3>{stats.open}</h3>
          <p>Open</p>
        </div>
        <div style={{ ...statCardStyle, borderLeft: '4px solid #f39c12' }}>
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </div>
        <div style={{ ...statCardStyle, borderLeft: '4px solid #2ecc71' }}>
          <h3>{stats.resolved}</h3>
          <p>Resolved</p>
        </div>
      </div>

      {/* navigation buttons — which ones show up depends on the user's role */}
      <h2>Quick Actions</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* everyone can see the bug list */}
        <button onClick={() => navigate('/bugs')} style={navButtonStyle}>
          View All Bugs
        </button>

        {/* only customers can submit new bugs (they're the ones who find them!) */}
        {user?.role === 'customer' && (
          <button onClick={() => navigate('/bugs/new')} style={navButtonStyle}>
            Submit New Bug
          </button>
        )}

        {/* only admins can access the admin panel */}
        {user?.role === 'admin' && (
          <button onClick={() => navigate('/admin')} style={navButtonStyle}>
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );
}

// --- styles ---
// we define styles as objects because React uses inline styles like this
// in a real project you'd probably use CSS files or a library like Tailwind

const logoutButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const statsContainerStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '30px',
  flexWrap: 'wrap',
};

const statCardStyle = {
  flex: '1',
  minWidth: '150px',
  padding: '15px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  textAlign: 'center',
};

const navButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default Dashboard;
