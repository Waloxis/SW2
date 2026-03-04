// react router lets us have multiple pages in our app without reloading the browser
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// these are the pages we'll create later in the pages/ folder
// LandingPage is the first thing users see before they log in
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    // BrowserRouter wraps everything so routing works throughout the whole app
    <BrowserRouter>
      <Routes>
        // each Route connects a URL path to a page component
        // when user goes to "/" they see the LandingPage first (changed from Login)
        <Route path="/" element={<LandingPage />} />

        // moved Login to its own /login route so users get there from the landing page
        <Route path="/login" element={<Login />} />

        // after logging in, user goes to the dashboard
        <Route path="/dashboard" element={<Dashboard />} />

        // this page shows the list of all bug reports
        <Route path="/bugs" element={<BugList />} />

        // this page has the form to submit a new bug
        <Route path="/bugs/new" element={<BugForm />} />

        // only admins will use this page to manage bugs and users
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;