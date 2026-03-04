// LandingPage - Main landing page for the bug tracker application
import React from 'react';
// useNavigate is a hook from react-router-dom that lets us send the user to a different page
// we use it here so the Login button can redirect to the login page
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  // create a navigate function that we can call to go to another route
  const navigate = useNavigate();
  return (
    <div>
      {/* Navbar - this is the navigation bar that sits at the top of the page */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
        {/* App name on the left side of the navbar */}
        <h1 style={{ margin: 0, fontSize: '20px' }}>Bug Tracker</h1>
        {/* Login button - when clicked, navigate to the /login page */}
        <button onClick={() => navigate('/login')} style={{ padding: '8px 16px', backgroundColor: 'white', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </nav>

      {/* Hero section - this is the big banner area that users see first when they visit the page */}
      <section style={{ textAlign: 'center', padding: '80px 20px' }}>
        {/* Main heading */}
        <h2 style={{ fontSize: '36px', margin: '0 0 16px 0' }}>Bug Tracker in Progress.</h2>
        {/* Short description explaining what the app does */}
        <p style={{ fontSize: '18px', color: '#555', maxWidth: '500px', margin: '0 auto' }}>
          A simple bug tracking tool that helps your team report issues, assign tasks, and keep projects on track.
        </p>
      </section>

      {/* Features section - this shows the main features of our app in a row of cards */}
      <section style={{ padding: '40px 20px', backgroundColor: '#f5f5f5' }}>
        {/* Section heading */}
        <h3 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px' }}>Features</h3>

        {/* Card container - uses flexbox to put the 3 cards side by side */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>

          {/* Feature card 1 - Submit Bugs */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '250px', textAlign: 'center' }}>
            {/* Card title */}
            <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Submit Bugs</h4>
            {/* Card description */}
            <p style={{ fontSize: '14px', color: '#555' }}>
              Report bugs with a detailed description and severity level so your team knows what to fix first.
            </p>
          </div>

          {/* Feature card 2 - Track Progress */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '250px', textAlign: 'center' }}>
            {/* Card title */}
            <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Track Progress</h4>
            {/* Card description */}
            <p style={{ fontSize: '14px', color: '#555' }}>
              Monitor your bug reports using ticket numbers and stay updated on their status.
            </p>
          </div>

          {/* Feature card 3 - Rate Solutions */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '250px', textAlign: 'center' }}>
            {/* Card title */}
            <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>Rate Solutions</h4>
            {/* Card description */}
            <p style={{ fontSize: '14px', color: '#555' }}>
              Rate how well a bug was resolved to help improve the quality of future fixes.
            </p>
          </div>

        </div>
      </section>

      {/* Footer - this is the bottom section of the page that shows the class info and team members */}
      <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#333', color: 'white', fontSize: '14px' }}>
        Bug Tracker — CSIT415 Spring 2026 | Group 9: Nestor, Walid, Daniel, Tanvir, Dariel
      </footer>
    </div>
  );
}

export default LandingPage;
