import React from 'react';
import { FaBook, FaGraduationCap, FaUsers, FaClock } from 'react-icons/fa';
import './BibleSchool.css';

/**
 * Bible School Component
 * Manages bible school and study group programs
 */
const BibleSchool = () => {
  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/bible-school/programs - Fetch all study programs
   * - POST /api/bible-school/programs - Create new program
   * - PUT /api/bible-school/programs/{id} - Update program
   * - DELETE /api/bible-school/programs/{id} - Remove program
   * - GET /api/bible-school/enrollments - Get student enrollments
   * - POST /api/bible-school/enroll - Enroll student in program
   * This will enable complete educational program management
   */
  const programs = [
    {
      id: 1,
      name: 'Adult Bible Study',
      instructor: 'Pastor Johnson',
      schedule: 'Wednesdays, 7:00 PM',
      duration: '8 weeks',
      students: 45,
      description: 'In-depth study of New Testament books'
    },
    {
      id: 2,
      name: 'Youth Bible Study',
      instructor: 'Pastor Williams',
      schedule: 'Saturdays, 4:00 PM',
      duration: '6 weeks',
      students: 28,
      description: 'Interactive Bible study for teenagers'
    },
    {
      id: 3,
      name: 'Children\'s Sunday School',
      instructor: 'Sarah Johnson',
      schedule: 'Sundays, 9:00 AM',
      duration: 'Ongoing',
      students: 35,
      description: 'Bible stories and lessons for children'
    },
    {
      id: 4,
      name: 'Marriage Study Group',
      instructor: 'Pastor & Mrs. Smith',
      schedule: 'Fridays, 7:30 PM',
      duration: '10 weeks',
      students: 20,
      description: 'Biblical principles for strong marriages'
    }
  ];

  return (
    <div className="bible-school-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Bible School & Study Groups</h1>
          <p className="page-subtitle">
            Educational programs and study groups for spiritual growth and learning
          </p>
        </div>
      </div>

      <div className="programs-grid">
        {programs.map((program) => (
          <div key={program.id} className="program-card">
            <div className="program-header">
              <div className="program-icon">
                <FaBook />
              </div>
              <div className="program-stats">
                <div className="stat">
                  <FaUsers />
                  <span>{program.students} students</span>
                </div>
              </div>
            </div>
            
            <h3 className="program-name">{program.name}</h3>
            <p className="program-description">{program.description}</p>
            
            <div className="program-details">
              <div className="detail-item">
                <FaGraduationCap />
                <span>Instructor: {program.instructor}</span>
              </div>
              <div className="detail-item">
                <FaClock />
                <span>Schedule: {program.schedule}</span>
              </div>
              <div className="detail-item">
                <FaBook />
                <span>Duration: {program.duration}</span>
              </div>
            </div>
            
            <button className="program-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibleSchool;