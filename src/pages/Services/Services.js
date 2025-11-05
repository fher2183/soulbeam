import React, { useState } from 'react';
import { FaClock, FaMapMarkerAlt, FaUsers, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './Services.css';

/**
 * Services Component
 * Manages in-person and online weekly services
 */
const Services = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  /**
   * Sample services data
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/services - Fetch all services
   * - POST /api/services - Create new service
   * - PUT /api/services/{id} - Update service
   * - DELETE /api/services/{id} - Delete service
   * This will replace the static data with dynamic database content
   */
  const [services] = useState([ // setServices will be used for CRUD operations in future updates
    {
      id: 1,
      title: 'Sunday Morning Worship',
      type: 'in-person',
      day: 'Sunday',
      time: '10:00 AM',
      duration: '90 minutes',
      location: 'Main Sanctuary',
      capacity: 500,
      attendance: 425,
      pastor: 'Pastor Johnson',
      description: 'Traditional worship service with choir and communion',
      isRecurring: true,
      onlineStream: true
    },
    {
      id: 2,
      title: 'Wednesday Bible Study',
      type: 'hybrid',
      day: 'Wednesday',
      time: '7:00 PM',
      duration: '60 minutes',
      location: 'Fellowship Hall',
      capacity: 100,
      attendance: 85,
      pastor: 'Pastor Smith',
      description: 'Interactive Bible study and discussion',
      isRecurring: true,
      onlineStream: true
    },
    {
      id: 3,
      title: 'Online Prayer Meeting',
      type: 'online',
      day: 'Friday',
      time: '6:00 PM',
      duration: '45 minutes',
      location: 'Virtual',
      capacity: 'Unlimited',
      attendance: 150,
      pastor: 'Pastor Davis',
      description: 'Community prayer and spiritual support',
      isRecurring: true,
      onlineStream: true
    },
    {
      id: 4,
      title: 'Youth Service',
      type: 'in-person',
      day: 'Saturday',
      time: '6:00 PM',
      duration: '120 minutes',
      location: 'Youth Center',
      capacity: 200,
      attendance: 180,
      pastor: 'Pastor Williams',
      description: 'Contemporary worship for teens and young adults',
      isRecurring: true,
      onlineStream: false
    }
  ]);

  /**
   * Filter services based on active tab
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API filtering will include:
   * - Server-side pagination (GET /api/services?page=1&limit=10)
   * - Advanced filtering (GET /api/services?type=online&pastor=Johnson)
   * - Search functionality (GET /api/services?search=worship)
   * - Sorting options (GET /api/services?sort=date&order=desc)
   */
  const filteredServices = services.filter(service => {
    if (activeTab === 'all') return true;
    return service.type === activeTab;
  });

  /**
   * Get attendance percentage
   */
  const getAttendancePercentage = (attendance, capacity) => {
    if (capacity === 'Unlimited') return 0;
    return Math.round((attendance / capacity) * 100);
  };

  /**
   * Get service type badge color
   */
  const getServiceTypeColor = (type) => {
    switch (type) {
      case 'in-person': return 'blue';
      case 'online': return 'green';
      case 'hybrid': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Weekly Services</h1>
          <p className="page-subtitle">
            Manage in-person and online worship services for your congregation
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus /> Add New Service
        </button>
      </div>

      {/* Service Statistics */}
      <div className="services-stats">
        <div className="stat-item">
          <div className="stat-number">
            {services.filter(s => s.type === 'in-person').length}
          </div>
          <div className="stat-label">In-Person Services</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {services.filter(s => s.type === 'online').length}
          </div>
          <div className="stat-label">Online Services</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {services.filter(s => s.type === 'hybrid').length}
          </div>
          <div className="stat-label">Hybrid Services</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">
            {services.reduce((total, service) => total + service.attendance, 0)}
          </div>
          <div className="stat-label">Total Weekly Attendance</div>
        </div>
      </div>

      {/* Service Filters */}
      <div className="service-filters">
        <button 
          className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Services ({services.length})
        </button>
        <button 
          className={`filter-btn ${activeTab === 'in-person' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-person')}
        >
          In-Person ({services.filter(s => s.type === 'in-person').length})
        </button>
        <button 
          className={`filter-btn ${activeTab === 'online' ? 'active' : ''}`}
          onClick={() => setActiveTab('online')}
        >
          Online ({services.filter(s => s.type === 'online').length})
        </button>
        <button 
          className={`filter-btn ${activeTab === 'hybrid' ? 'active' : ''}`}
          onClick={() => setActiveTab('hybrid')}
        >
          Hybrid ({services.filter(s => s.type === 'hybrid').length})
        </button>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <div className="service-title-section">
                <h3 className="service-title">{service.title}</h3>
                <div className={`service-type-badge badge-${getServiceTypeColor(service.type)}`}>
                  {service.type.replace('-', ' ')}
                </div>
              </div>
              <div className="service-actions">
                <button className="action-btn view-btn" title="View Details">
                  <FaEye />
                </button>
                <button className="action-btn edit-btn" title="Edit Service">
                  <FaEdit />
                </button>
                <button className="action-btn delete-btn" title="Delete Service">
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="service-info">
              <div className="info-row">
                <FaClock className="info-icon" />
                <span>{service.day}, {service.time}</span>
                <span className="duration">({service.duration})</span>
              </div>
              
              <div className="info-row">
                <FaMapMarkerAlt className="info-icon" />
                <span>{service.location}</span>
              </div>
              
              <div className="info-row">
                <FaUsers className="info-icon" />
                <span>
                  {service.attendance} / {service.capacity} attendees
                  {service.capacity !== 'Unlimited' && (
                    <span className="attendance-percentage">
                      ({getAttendancePercentage(service.attendance, service.capacity)}% capacity)
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="service-description">
              <p>{service.description}</p>
            </div>

            <div className="service-details">
              <div className="detail-item">
                <strong>Pastor:</strong> {service.pastor}
              </div>
              <div className="service-features">
                {service.isRecurring && (
                  <span className="feature-badge">Recurring</span>
                )}
                {service.onlineStream && (
                  <span className="feature-badge">Live Stream</span>
                )}
              </div>
            </div>

            {/* Attendance Progress Bar */}
            {service.capacity !== 'Unlimited' && (
              <div className="attendance-progress">
                <div className="progress-label">
                  <span>Attendance</span>
                  <span>{getAttendancePercentage(service.attendance, service.capacity)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getAttendancePercentage(service.attendance, service.capacity)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">⛪</div>
          <h3>No services found</h3>
          <p>No services match the current filter. Try selecting a different category.</p>
        </div>
      )}

      {/* Add Service Modal would go here */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Service</h2>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Service creation form would be implemented here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;