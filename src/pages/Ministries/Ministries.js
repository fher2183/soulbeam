import React, { useState } from 'react';
import { FaChild, FaUsers, FaHeart, FaUserTie, FaPlus, FaEdit, FaEye } from 'react-icons/fa';
import './Ministries.css';

/**
 * Ministries Component
 * Manages ministry programs for different age groups
 */
const Ministries = () => {
  const [activeTab, setActiveTab] = useState('all');

  /**
   * Ministry programs data
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/ministries - Fetch all ministry programs
   * - POST /api/ministries - Create new ministry
   * - PUT /api/ministries/{id} - Update ministry details
   * - DELETE /api/ministries/{id} - Remove ministry
   * - GET /api/ministries/categories - Fetch ministry categories
   * This will enable dynamic ministry management from database
   */
  const ministries = [
    {
      id: 1,
      name: 'Children\'s Ministry',
      category: 'children',
      icon: <FaChild />,
      description: 'Sunday school and activities for children ages 3-12',
      leader: 'Sarah Johnson',
      members: 85,
      meetingTime: 'Sundays, 9:00 AM',
      location: 'Children\'s Wing',
      activities: ['Sunday School', 'VBS', 'Christmas Play', 'Easter Egg Hunt'],
      ageRange: '3-12 years',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Youth Ministry',
      category: 'youth',
      icon: <FaUsers />,
      description: 'Dynamic programs for teenagers and young adults',
      leader: 'Pastor Mike Williams',
      members: 65,
      meetingTime: 'Saturdays, 6:00 PM',
      location: 'Youth Center',
      activities: ['Youth Service', 'Bible Study', 'Sports Night', 'Mission Trips'],
      ageRange: '13-18 years',
      color: 'green'
    },
    {
      id: 3,
      name: 'Marriage Ministry',
      category: 'couples',
      icon: <FaHeart />,
      description: 'Support and enrichment for married couples',
      leader: 'Pastor David & Mary Smith',
      members: 42,
      meetingTime: 'Fridays, 7:00 PM',
      location: 'Fellowship Hall',
      activities: ['Marriage Seminars', 'Date Nights', 'Couples Retreat', 'Counseling'],
      ageRange: 'All ages',
      color: 'purple'
    },
    {
      id: 4,
      name: 'Senior Adults Ministry',
      category: 'seniors',
      icon: <FaUserTie />,
      description: 'Fellowship and activities for mature believers',
      leader: 'Elder Robert Davis',
      members: 58,
      meetingTime: 'Thursdays, 2:00 PM',
      location: 'Senior Center',
      activities: ['Bible Study', 'Lunch Fellowship', 'Game Day', 'Prayer Group'],
      ageRange: '55+ years',
      color: 'orange'
    }
  ];

  /**
   * Filter ministries based on active tab
   */
  const filteredMinistries = ministries.filter(ministry => {
    if (activeTab === 'all') return true;
    return ministry.category === activeTab;
  });

  /**
   * Get total members across all ministries
   */
  const totalMembers = ministries.reduce((total, ministry) => total + ministry.members, 0);

  return (
    <div className="ministries-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Ministry Programs</h1>
          <p className="page-subtitle">
            Comprehensive programs for children, youth, couples, and senior adults
          </p>
        </div>
        <button className="btn-primary">
          <FaPlus /> Add New Ministry
        </button>
      </div>

      {/* Ministry Statistics */}
      <div className="ministry-stats">
        <div className="stat-card">
          <div className="stat-number">{ministries.length}</div>
          <div className="stat-label">Active Ministries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalMembers}</div>
          <div className="stat-label">Total Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {Math.round(totalMembers / ministries.length)}
          </div>
          <div className="stat-label">Avg Members/Ministry</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {ministries.reduce((total, ministry) => total + ministry.activities.length, 0)}
          </div>
          <div className="stat-label">Total Activities</div>
        </div>
      </div>

      {/* Ministry Filters */}
      <div className="ministry-filters">
        <button 
          className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Ministries
        </button>
        <button 
          className={`filter-btn ${activeTab === 'children' ? 'active' : ''}`}
          onClick={() => setActiveTab('children')}
        >
          Children
        </button>
        <button 
          className={`filter-btn ${activeTab === 'youth' ? 'active' : ''}`}
          onClick={() => setActiveTab('youth')}
        >
          Youth
        </button>
        <button 
          className={`filter-btn ${activeTab === 'couples' ? 'active' : ''}`}
          onClick={() => setActiveTab('couples')}
        >
          Couples
        </button>
        <button 
          className={`filter-btn ${activeTab === 'seniors' ? 'active' : ''}`}
          onClick={() => setActiveTab('seniors')}
        >
          Senior Adults
        </button>
      </div>

      {/* Ministries Grid */}
      <div className="ministries-grid">
        {filteredMinistries.map((ministry) => (
          <div key={ministry.id} className={`ministry-card ministry-${ministry.color}`}>
            <div className="ministry-header">
              <div className="ministry-icon">
                {ministry.icon}
              </div>
              <div className="ministry-actions">
                <button className="action-btn view-btn" title="View Details">
                  <FaEye />
                </button>
                <button className="action-btn edit-btn" title="Edit Ministry">
                  <FaEdit />
                </button>
              </div>
            </div>

            <div className="ministry-content">
              <h3 className="ministry-name">{ministry.name}</h3>
              <p className="ministry-description">{ministry.description}</p>

              <div className="ministry-details">
                <div className="detail-row">
                  <strong>Leader:</strong> {ministry.leader}
                </div>
                <div className="detail-row">
                  <strong>Members:</strong> {ministry.members}
                </div>
                <div className="detail-row">
                  <strong>Meeting Time:</strong> {ministry.meetingTime}
                </div>
                <div className="detail-row">
                  <strong>Location:</strong> {ministry.location}
                </div>
                <div className="detail-row">
                  <strong>Age Range:</strong> {ministry.ageRange}
                </div>
              </div>

              <div className="ministry-activities">
                <h4>Activities & Programs</h4>
                <div className="activities-grid">
                  {ministry.activities.map((activity, index) => (
                    <span key={index} className="activity-tag">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="ministry-members">
                <div className="members-count">
                  <FaUsers className="members-icon" />
                  <span>{ministry.members} Active Members</span>
                </div>
                <div className="members-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min((ministry.members / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ministry Overview Section */}
      <div className="ministry-overview">
        <h2>Ministry Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <h3>Our Mission</h3>
            <p>
              To provide comprehensive spiritual growth opportunities for every age group 
              in our church community, fostering discipleship and fellowship.
            </p>
          </div>
          <div className="overview-card">
            <h3>Leadership Development</h3>
            <p>
              We focus on developing leaders within each ministry, providing training 
              and support for effective ministry management and spiritual guidance.
            </p>
          </div>
          <div className="overview-card">
            <h3>Community Outreach</h3>
            <p>
              Our ministries extend beyond church walls, engaging with the local 
              community through service projects and outreach programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ministries;