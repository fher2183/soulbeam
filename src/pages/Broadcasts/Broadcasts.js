import React from 'react';
import { FaTv, FaBroadcastTower, FaFacebook, FaYoutube, FaInstagram, FaPlay } from 'react-icons/fa';
import './Broadcasts.css';

/**
 * Broadcasts Component
 * Manages TV, radio, and social media broadcasts
 */
const Broadcasts = () => {
  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/broadcasts - Fetch all broadcast channels
   * - POST /api/broadcasts - Create new broadcast
   * - PUT /api/broadcasts/{id} - Update broadcast info
   * - DELETE /api/broadcasts/{id} - Remove broadcast
   * This will replace static broadcast data with live database content
   */
  const broadcasts = [
    {
      id: 1,
      title: 'Sunday Morning Service',
      platform: 'Live TV',
      status: 'Live',
      viewers: 1250,
      schedule: 'Sundays, 10:00 AM',
      icon: <FaTv />,
      color: 'red'
    },
    {
      id: 2,
      title: 'Daily Devotion',
      platform: 'Radio',
      status: 'Scheduled',
      viewers: 850,
      schedule: 'Daily, 6:00 AM',
      icon: <FaBroadcastTower />,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Youth Service',
      platform: 'YouTube',
      status: 'Upcoming',
      viewers: 650,
      schedule: 'Saturdays, 6:00 PM',
      icon: <FaYoutube />,
      color: 'red'
    },
    {
      id: 4,
      title: 'Prayer Meeting',
      platform: 'Facebook Live',
      status: 'Weekly',
      viewers: 420,
      schedule: 'Fridays, 7:00 PM',
      icon: <FaFacebook />,
      color: 'blue'
    }
  ];

  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/social-media/stats
   * This will fetch real-time social media statistics from external APIs
   * and database stored configurations
   */
  const socialStats = [
    { platform: 'YouTube', subscribers: '12.5K', icon: <FaYoutube />, color: '#ff0000' },
    { platform: 'Facebook', followers: '8.2K', icon: <FaFacebook />, color: '#1877f2' },
    { platform: 'Instagram', followers: '5.8K', icon: <FaInstagram />, color: '#e4405f' },
    { platform: 'Radio', listeners: '15.2K', icon: <FaBroadcastTower />, color: '#10b981' }
  ];

  return (
    <div className="broadcasts-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Media & Broadcasts</h1>
          <p className="page-subtitle">
            TV, radio, and social media streaming for wider community reach
          </p>
        </div>
      </div>

      {/* Social Media Stats */}
      <div className="social-stats">
        {socialStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <div className="stat-number">{stat.subscribers || stat.followers || stat.listeners}</div>
              <div className="stat-platform">{stat.platform}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Broadcasts Grid */}
      <div className="broadcasts-grid">
        {broadcasts.map((broadcast) => (
          <div key={broadcast.id} className="broadcast-card">
            <div className="broadcast-header">
              <div className="broadcast-icon">
                {broadcast.icon}
              </div>
              <div className={`broadcast-status status-${broadcast.status.toLowerCase()}`}>
                {broadcast.status === 'Live' && <span className="live-dot"></span>}
                {broadcast.status}
              </div>
            </div>
            
            <h3 className="broadcast-title">{broadcast.title}</h3>
            <p className="broadcast-platform">{broadcast.platform}</p>
            
            <div className="broadcast-details">
              <div className="detail-item">
                <span>Schedule: {broadcast.schedule}</span>
              </div>
              <div className="detail-item">
                <span>Viewers: {broadcast.viewers.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="broadcast-actions">
              <button className="broadcast-btn primary">
                <FaPlay /> {broadcast.status === 'Live' ? 'Watch Live' : 'View Details'}
              </button>
              <button className="broadcast-btn secondary">
                Settings
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions-grid">
          <button className="quick-action-btn">
            <FaTv />
            <span>Start Live Stream</span>
          </button>
          <button className="quick-action-btn">
            <FaBroadcastTower />
            <span>Schedule Radio Show</span>
          </button>
          <button className="quick-action-btn">
            <FaYoutube />
            <span>Upload Video</span>
          </button>
          <button className="quick-action-btn">
            <FaFacebook />
            <span>Post Update</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Broadcasts;