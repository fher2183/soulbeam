import React from 'react';
import { FaMusic, FaMicrophone, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Events.css';

/**
 * Events Component
 * Manages musical events and conferences
 */
const Events = () => {
  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/events - Fetch all events
   * - POST /api/events - Create new event
   * - PUT /api/events/{id} - Update event details
   * - DELETE /api/events/{id} - Cancel event
   * - GET /api/events/registrations/{id} - Get event registrations
   * - POST /api/events/register - Register for event
   * This will enable full event management with registration system
   */
  const events = [
    {
      id: 1,
      title: 'Christmas Concert',
      type: 'Musical Event',
      date: 'December 24, 2025',
      time: '7:00 PM',
      location: 'Main Sanctuary',
      description: 'Annual Christmas celebration with choir and orchestra',
      capacity: 500,
      registered: 425,
      icon: <FaMusic />
    },
    {
      id: 2,
      title: 'Leadership Conference',
      type: 'Conference',
      date: 'January 15-17, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'Conference Center',
      description: 'Three-day leadership development conference',
      capacity: 200,
      registered: 180,
      icon: <FaMicrophone />
    },
    {
      id: 3,
      title: 'Gospel Night',
      type: 'Musical Event',
      date: 'February 20, 2026',
      time: '6:00 PM',
      location: 'Fellowship Hall',
      description: 'Evening of gospel music and worship',
      capacity: 300,
      registered: 275,
      icon: <FaMusic />
    },
    {
      id: 4,
      title: 'Marriage Seminar',
      type: 'Conference',
      date: 'March 5-6, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'Education Building',
      description: 'Weekend seminar for couples',
      capacity: 150,
      registered: 120,
      icon: <FaMicrophone />
    }
  ];

  return (
    <div className="events-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Events & Conferences</h1>
          <p className="page-subtitle">
            Musical events, conferences, and special gatherings for our community
          </p>
        </div>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <div className="event-icon">
                {event.icon}
              </div>
              <div className="event-type-badge">
                {event.type}
              </div>
            </div>
            
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            
            <div className="event-details">
              <div className="detail-item">
                <FaCalendarAlt />
                <span>{event.date}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt />
                <span>{event.time}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt />
                <span>{event.location}</span>
              </div>
            </div>
            
            <div className="event-registration">
              <div className="registration-info">
                <span>{event.registered} / {event.capacity} registered</span>
                <span>{Math.round((event.registered / event.capacity) * 100)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                />
              </div>
            </div>
            
            <button className="event-btn">Register Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;