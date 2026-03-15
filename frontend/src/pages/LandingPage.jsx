// LandingPage.jsx
// This is the main landing page component for our bug tracker app
// I learned how to make this from the React course on Coursera
// TODO: maybe add more features later

import React from 'react';
// useNavigate lets us go to different pages without reloading
// I learned this from the React Router module in week 3
import { useNavigate } from 'react-router-dom';

// this is our main component function
function LandingPage() {
  // this hook gives us a function to change pages
  const navigate = useNavigate();

  // handleLogin function - runs when user clicks the login button
  // I made this a separate function because the instructor said its cleaner
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    // main wrapper div for the whole page
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>

      {/* ========== NAVBAR SECTION ========== */}
      {/* this is the navigation bar at the top */}
      {/* I used flexbox to put the title on the left and button on the right */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 25px',
        backgroundColor: '#e8e8e8',
        borderBottom: '2px solid #cccccc',
      }}>
        {/* app name - I just used a h1 tag for this */}
        <h1 style={{ margin: 0, fontSize: '22px', color: '#0066cc' }}>
          Bug Tracker
        </h1>

        {/* login button */}
        <button
          onClick={handleLogin}
          style={{
            padding: '8px 20px',
            backgroundColor: '#0066cc',
            color: 'white',
            border: '1px solid #0066cc',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Login
        </button>
      </nav>

      {/* ========== HERO SECTION ========== */}
      {/* this is the big section that shows what the app is about */}
      {/* I centered everything using textAlign center */}
      <section style={{
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: 'white',
      }}>
        {/* main heading for the page */}
        <h2 style={{
          fontSize: '32px',
          color: '#222222',
          marginBottom: '12px',
          fontWeight: 'bold',
        }}>
          Bug Tracker - Work in Progress
        </h2>

        {/* description paragraph */}
        {/* I used maxWidth so it doesnt stretch too wide on big screens */}
        <p style={{
          fontSize: '16px',
          color: '#555555',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: '1.5',
        }}>
          A simple bug tracking tool that helps your team report issues, assign tasks, and keep projects on track.
        </p>

        {/* I added a horizontal line here to separate sections */}
        {/* not sure if this is the best way to do it but it works */}
        <hr style={{ width: '80px', border: '1px solid #0066cc', marginTop: '30px' }} />
      </section>

      {/* ========== FEATURES SECTION ========== */}
      {/* this section shows the 3 main features of our app */}
      {/* we use flexbox to display the cards in a row */}
      <section style={{
        padding: '40px 30px',
        backgroundColor: '#f0f0f0',
        borderTop: '1px solid #dddddd',
        borderBottom: '1px solid #dddddd',
      }}>
        {/* section title */}
        <h3 style={{
          textAlign: 'center',
          fontSize: '22px',
          marginBottom: '25px',
          color: '#333333',
        }}>
          Features
        </h3>

        {/* card container - flexbox row */}
        {/* I used flexWrap so the cards go to next line on small screens */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
        }}>

          {/* Feature Card 1 - Submit Bugs */}
          {/* each card is just a div with a border */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px 20px',
            width: '240px',
            textAlign: 'center',
            border: '1px solid #cccccc',
          }}>
            {/* card title */}
            <h4 style={{ fontSize: '17px', marginBottom: '8px', color: '#0066cc' }}>
              Submit Bugs
            </h4>
            {/* card description */}
            <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.4' }}>
              Report bugs with a detailed description and severity level so your team knows what to fix first.
            </p>
          </div>

          {/* Feature Card 2 - Track Progress */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            width: '240px',
            textAlign: 'center',
            border: '1px solid #cccccc',
          }}>
            {/* card title */}
            <h4 style={{ fontSize: '17px', marginBottom: '10px', color: '#0066cc' }}>
              Track Progress
            </h4>
            {/* card text */}
            <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.4' }}>
              Monitor your bug reports using ticket numbers and stay updated on their status.
            </p>
          </div>

          {/* Feature Card 3 - Rate Solutions */}
          <div style={{
            backgroundColor: 'white',
            padding: '22px 18px',
            width: '240px',
            textAlign: 'center',
            border: '1px solid #cccccc',
          }}>
            {/* card title */}
            <h4 style={{ fontSize: '17px', marginBottom: '10px', color: '#0066cc' }}>
              Rate Solutions
            </h4>
            {/* description */}
            <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.4' }}>
              Rate how well a bug was resolved to help improve the quality of future fixes.
            </p>
          </div>

        </div>
      </section>

      {/* ========== FOOTER ========== */}
      {/* footer section with our class info and team names */}
      {/* I used a light background here instead of dark because I think it looks cleaner */}
      <footer style={{
        textAlign: 'center',
        padding: '15px',
        backgroundColor: '#e8e8e8',
        borderTop: '1px solid #cccccc',
        fontSize: '13px',
        color: '#555555',
      }}>
        {/* class name and group members */}
        Bug Tracker &mdash; CSIT415 | Group 9: Nestor, Walid, Daniel, Tanvir, Dariel
      </footer>
    </div>
  );
}

// exporting the component so we can use it in other files
export default LandingPage;
