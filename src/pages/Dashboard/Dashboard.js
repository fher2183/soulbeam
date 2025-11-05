import React from 'react';
import { FaUsers, FaCalendarAlt, FaChurch, FaBroadcastTower, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Dashboard.css';

/**
 * Dashboard Component
 * Main overview page showing church statistics and quick access
 */
const Dashboard = () => {
  
  /**
   * Statistics data for the dashboard cards
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/dashboard/statistics
   * This will fetch real-time church statistics from database
   */
  const stats = [
    {
      title: 'Total Members',
      value: '1,245',
      change: '+12%',
      trend: 'up',
      icon: <FaUsers />,
      color: 'blue'
    },
    {
      title: 'Weekly Services',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: <FaChurch />,
      color: 'green'
    },
    {
      title: 'Upcoming Events',
      value: '15',
      change: '+5',
      trend: 'up',
      icon: <FaCalendarAlt />,
      color: 'purple'
    },
    {
      title: 'Live Streams',
      value: '3,450',
      change: '+8%',
      trend: 'up',
      icon: <FaBroadcastTower />,
      color: 'orange'
    }
  ];

  /**
   * Recent activities data
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/activities/recent
   * This will fetch real-time activity feed from system events
   */
  const recentActivities = [
    {
      id: 1,
      title: 'New member registration',
      description: 'Sarah Johnson joined the youth ministry',
      time: '2 hours ago',
      type: 'member'
    },
    {
      id: 2,
      title: 'Sunday service scheduled',
      description: 'Morning worship service at 10:00 AM',
      time: '5 hours ago',
      type: 'service'
    },
    {
      id: 3,
      title: 'Bible study group created',
      description: 'New study group for young adults',
      time: '1 day ago',
      type: 'study'
    },
    {
      id: 4,
      title: 'Event reminder sent',
      description: 'Christmas concert notifications sent to all members',
      time: '2 days ago',
      type: 'event'
    }
  ];

  /**
   * Upcoming events data
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/events/upcoming
   * This will fetch next upcoming events from database
   */
  const upcomingEvents = [
    {
      id: 1,
      title: 'Christmas Concert',
      date: 'December 24, 2025',
      time: '7:00 PM',
      location: 'Main Sanctuary'
    },
    {
      id: 2,
      title: 'Youth Retreat',
      date: 'January 15, 2026',
      time: '9:00 AM',
      location: 'Mountain View Camp'
    },
    {
      id: 3,
      title: 'Marriage Seminar',
      date: 'February 5, 2026',
      time: '6:00 PM',
      location: 'Fellowship Hall'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Here's an overview of your church's activities.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-card-${stat.color}`}>
            <div className="stat-content">
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                <div className={`stat-trend trend-${stat.trend}`}>
                  {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                  {stat.change}
                </div>
              </div>
              <div className="stat-info">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Recent Activities */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Activities</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon activity-${activity.type}`}>
                  {activity.type === 'member' && '👤'}
                  {activity.type === 'service' && '⛪'}
                  {activity.type === 'study' && '📖'}
                  {activity.type === 'event' && '🎉'}
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-description">{activity.description}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Events</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-date">
                  <span className="event-month">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="event-day">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="event-content">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-details">
                    {event.time} • {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            <button className="action-btn action-primary">
              <FaUsers />
              Add New Member
            </button>
            <button className="action-btn action-secondary">
              <FaCalendarAlt />
              Schedule Service
            </button>
            <button className="action-btn action-secondary">
              <FaChurch />
              Create Event
            </button>
            <button className="action-btn action-secondary">
              <FaBroadcastTower />
              Start Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;