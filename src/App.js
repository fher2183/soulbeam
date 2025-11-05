import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

// Pages
import Services from './pages/Services/Services';
import Ministries from './pages/Ministries/Ministries';
import BibleSchool from './pages/BibleSchool/BibleSchool';
import Events from './pages/Events/Events';
import Broadcasts from './pages/Broadcasts/Broadcasts';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';

function App() {
  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * Authentication state management will be replaced with:
   * - JWT token validation
   * - User session management from backend
   * - Role-based permissions system
   * API endpoints: 
   * - POST /api/auth/login
   * - POST /api/auth/logout
   * - GET /api/auth/validate-token
   */
  // State to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Header onLogout={handleLogout} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/services" element={<Services />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/bible-school" element={<BibleSchool />} />
              <Route path="/events" element={<Events />} />
              <Route path="/broadcasts" element={<Broadcasts />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
