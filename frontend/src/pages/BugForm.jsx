// BugForm.jsx
// this is the page where users can submit a new bug report
// it has a form with title, description, and severity
// TODO: maybe add a file upload feature later

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function BugForm() {
  const navigate = useNavigate();

  // form field states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('LOW');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // runs when user clicks submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure they filled in the fields
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both the title and description.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // send bug data to the backend
      await api.post('/bugs', {
        title,
        description,
        severity,
      });

      // it worked
      setSuccess(true);

      // clear the form
      setTitle('');
      setDescription('');
      setSeverity('LOW');
    } catch (err) {
      console.log('Error submitting bug:', err);
      setError('Failed to submit bug. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <button onClick={() => navigate('/bugs')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Bugs</button>
          {localStorage.getItem('role') === 'admin' && (
            <button onClick={() => navigate('/admin')} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#0066cc', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Admin</button>
          )}
          <button onClick={() => { localStorage.clear(); navigate('/'); }} style={{ padding: '8px 18px', backgroundColor: '#0066cc', color: 'white', border: '1px solid #0066cc', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
        </div>
      </nav>

      {/* main content */}
      <div style={{ padding: '25px 30px', maxWidth: '650px', margin: '0 auto' }}>

        <h2 style={{
          fontSize: '26px',
          marginBottom: '5px',
          color: '#222222',
        }}>
          Submit a Bug Report
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#555555',
          marginBottom: '25px',
        }}>
          Fill out the form below to report a new issue.
        </p>

        {/* success message */}
        {success && (
          <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', marginBottom: '15px', fontSize: '14px' }}>
            Bug submitted! The team will look at it soon.
          </div>
        )}

        {/* error message */}
        {error && (
          <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', marginBottom: '15px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        {/* the form */}
        <form onSubmit={handleSubmit} style={{
          padding: '25px',
          backgroundColor: 'white',
          border: '1px solid #cccccc',
        }}>

          {/* title field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>Bug Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Login button not working"
              style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', fontSize: '14px', boxSizing: 'border-box' }}
            />
          </div>

          {/* description field */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened..."
              rows={5}
              style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          {/* severity dropdown */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', fontSize: '14px', boxSizing: 'border-box' }}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          {/* submit button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: '1px solid #0066cc',
              cursor: 'pointer',
              fontSize: '16px',
              width: '100%',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Bug Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BugForm;
