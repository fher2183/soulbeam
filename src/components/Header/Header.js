import React from 'react';
import { FaSignOutAlt, FaUser, FaBell } from 'react-icons/fa';
import './Header.css';

/**
 * Header Component
 * Displays the top navigation bar with user controls
 * @param {Function} onLogout - Callback function for logout
 */
const Header = ({ onLogout }) => {
  
  /**
   * Handle logout action
   */
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      onLogout();
    }
  };

  /**
   * Get current date formatted for display
   */
  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-info">
          <h1 className="header-title">Church Management System</h1>
          <p className="header-date">{getCurrentDate()}</p>
        </div>
      </div>

      <div className="header-right">
        {/* Notifications 
            TODO: This section is going to be integrated with the REST API in C#, 
            the backend area is working on that.... pending
            API endpoint: GET /api/notifications/unread
            This will fetch real-time notifications from database */}
        <button className="header-btn notification-btn" title="Notifications">
          <FaBell />
          <span className="notification-badge">3</span>
        </button>

        {/* User profile
            TODO: This section is going to be integrated with the REST API in C#, 
            the backend area is working on that.... pending
            API endpoint: GET /api/user/profile
            This will fetch current user information from authentication context */}
        <div className="user-profile">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Church Administrator</span>
          </div>
        </div>

        {/* Logout button */}
        <button
          className="header-btn logout-btn"
          onClick={handleLogout}
          title="Sign out"
        >
          <FaSignOutAlt />
          <span className="btn-text">Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default Header;