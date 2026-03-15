// App.js
// this file sets up all the pages and their urls
// I think of it like a table of contents for the app

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// all the page components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home page */}
        <Route path="/" element={<LandingPage />} />

        {/* login page */}
        <Route path="/login" element={<Login />} />

        {/* main dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* bug list page */}
        <Route path="/bugs" element={<BugList />} />

        {/* form to report a new bug */}
        <Route path="/bugs/new" element={<BugForm />} />

        {/* admin only page */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
