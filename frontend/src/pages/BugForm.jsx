// BugForm.jsx — this is where customers submit new bug reports
// it has a simple form with fields for title, description, and severity
// when submitted, it sends the data to the backend via a POST request

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

function BugForm() {
  const navigate = useNavigate();

  // each form field gets its own state variable
  // when the user types, React updates the state and re-renders the input
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('LOW');       // default to LOW severity
  const [submitting, setSubmitting] = useState(false);   // prevents double-clicking submit
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // this function runs when the user clicks the Submit button
  const handleSubmit = async (e) => {
    // e.preventDefault() stops the form from refreshing the page (default browser behavior)
    e.preventDefault();

    // basic validation — make sure they filled in the required fields
    if (!title.trim() || !description.trim()) {
      setError('Please fill in both the title and description.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // send the bug data to our Spring Boot backend
      // the backend expects a JSON object with these fields
      await api.post('/bugs', {
        title,
        description,
        severity,
      });

      // if it worked, show a success message
      setSuccess(true);

      // clear the form so they can submit another bug if they want
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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Submit a Bug Report</h1>
        <button onClick={() => navigate('/dashboard')} style={backButtonStyle}>
          Back to Dashboard
        </button>
      </div>

      {/* success message — shows up after a bug is submitted successfully */}
      {success && (
        <div style={successStyle}>
          Bug submitted successfully! Our team will review it soon.
        </div>
      )}

      {/* error message — shows up if something went wrong */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* the actual form — onSubmit calls our handleSubmit function */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>

        {/* bug title field */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Bug Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Login button not working"
            style={inputStyle}
          />
        </div>

        {/* description field — we use a textarea because descriptions can be long */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the bug in detail... What happened? What did you expect to happen?"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        {/* severity dropdown — how serious is this bug? */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Severity</label>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            style={inputStyle}
          >
            <option value="LOW">Low — minor issue, not urgent</option>
            <option value="MEDIUM">Medium — affects some users</option>
            <option value="HIGH">High — major feature broken</option>
            <option value="CRITICAL">Critical — app is unusable</option>
          </select>
        </div>

        {/* submit button — disabled while the request is in progress */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            ...submitButtonStyle,
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Bug Report'}
        </button>
      </form>
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

const fieldStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const submitButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '100%',
};

const successStyle = {
  padding: '12px',
  backgroundColor: '#d4edda',
  color: '#155724',
  borderRadius: '4px',
  marginBottom: '15px',
};

const errorStyle = {
  padding: '12px',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderRadius: '4px',
  marginBottom: '15px',
};

export default BugForm;
