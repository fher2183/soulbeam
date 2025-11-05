import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaChurch, 
  FaUsers, 
  FaBook, 
  FaCalendarAlt, 
  FaBroadcastTower,
  FaBars,
  FaTimes,
  FaHands
} from 'react-icons/fa';
import './Sidebar.css';

/**
 * Sidebar Component
 * Provides navigation menu for the church management system
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {Function} onToggle - Callback to toggle sidebar
 */
const Sidebar = ({ isOpen, onToggle }) => {
  
  /**
   * Navigation menu items configuration
   * Each item includes path, label, icon, and description
   * 
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/menu/items
   * This will allow dynamic menu configuration from database
   */
  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <FaHome />,
      description: 'Overview and statistics'
    },
    {
      path: '/members',
      label: 'Members',
      icon: <FaUsers />,
      description: 'Manage church members'
    },
    {
      path: '/services',
      label: 'Services',
      icon: <FaChurch />,
      description: 'Weekly services management'
    },
    {
      path: '/ministries',
      label: 'Ministries',
      icon: <FaHands />,
      description: 'Ministry programs'
    },
    {
      path: '/bible-school',
      label: 'Bible School',
      icon: <FaBook />,
      description: 'Educational programs'
    },
    {
      path: '/events',
      label: 'Events',
      icon: <FaCalendarAlt />,
      description: 'Conferences and activities'
    },
    {
      path: '/broadcasts',
      label: 'Broadcasts',
      icon: <FaBroadcastTower />,
      description: 'Media and streaming'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar container */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Sidebar header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">✨</div>
            {isOpen && (
              <div className="logo-content">
                <h2 className="logo-title">SoulBeam</h2>
                <p className="logo-subtitle">Church Management</p>
              </div>
            )}
          </div>
          
          <button 
            className="sidebar-toggle"
            onClick={onToggle}
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                  title={!isOpen ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {isOpen && (
                    <div className="nav-content">
                      <span className="nav-label">{item.label}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        {isOpen && (
          <div className="sidebar-footer">
            <div className="footer-content">
              <p className="footer-text">
                Built with ❤️ for church communities
              </p>
              <p className="footer-version">Version 1.0.0</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;