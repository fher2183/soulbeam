import React, { useState } from 'react';
import { FaSearch, FaUserPlus, FaEdit, FaTrash, FaEye, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaTimes, FaArrowLeft } from 'react-icons/fa';
import MemberForm from './MemberForm';
import './Members.css';

/**
 * Members Component
 * Main page for managing church members/devotees with search functionality
 */
const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
  const [editingMember, setEditingMember] = useState(null);

  /*
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoints:
   * - GET /api/members - Fetch all members with pagination
   * - GET /api/members/search?q={term} - Search members
   * - POST /api/members - Create new member
   * - PUT /api/members/{id} - Update member
   * - DELETE /api/members/{id} - Delete member
   * - GET /api/members/{id} - Get member details
   * - GET /api/members/export - Export members list
   * This will enable complete member management system
   */
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      birthDate: '1985-06-15',
      memberSince: '2020-03-10',
      status: 'active',
      ministry: 'Youth Ministry',
      photo: null,
      emergencyContact: 'Jane Doe - (555) 123-4568',
      notes: 'Regular attender, volunteers in Sunday school'
    },
    {
      id: 2,
      firstName: 'Maria',
      lastName: 'Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, City, State 12345',
      birthDate: '1978-12-03',
      memberSince: '2018-08-22',
      status: 'active',
      ministry: 'Worship Team',
      photo: null,
      emergencyContact: 'Carlos Garcia - (555) 234-5679',
      notes: 'Choir member, excellent soprano voice'
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.johnson@email.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine Rd, City, State 12345',
      birthDate: '1965-04-20',
      memberSince: '2015-01-15',
      status: 'active',
      ministry: 'Elder Board',
      photo: null,
      emergencyContact: 'Linda Johnson - (555) 345-6780',
      notes: 'Church elder, financial committee member'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@email.com',
      phone: '+1 (555) 456-7890',
      address: '321 Elm St, City, State 12345',
      birthDate: '1990-09-12',
      memberSince: '2019-11-08',
      status: 'inactive',
      ministry: 'Children Ministry',
      photo: null,
      emergencyContact: 'Michael Williams - (555) 456-7891',
      notes: 'Recently moved, maintaining contact'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@email.com',
      phone: '+1 (555) 567-8901',
      address: '654 Maple Dr, City, State 12345',
      birthDate: '1982-07-25',
      memberSince: '2021-05-30',
      status: 'active',
      ministry: 'Men Ministry',
      photo: null,
      emergencyContact: 'Jennifer Brown - (555) 567-8902',
      notes: 'New member, very engaged in activities'
    }
  ]);

  /**
   * Filter members based on search term and status
   */
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm) ||
      member.ministry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /**
   * Handle search input change
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handle delete member confirmation
   */
  const handleDeleteClick = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  /**
   * Confirm delete member
   */
  const confirmDelete = () => {
    /*
     * TODO: This section is going to be integrated with the REST API in C#, 
     * the backend area is working on that.... pending
     * API call: DELETE /api/members/{selectedMember.id}
     */
    
    // Remove member from the list
    setMembers(prevMembers => 
      prevMembers.filter(member => member.id !== selectedMember.id)
    );
    
    setShowDeleteModal(false);
    setSelectedMember(null);
    
    // Show success message (in production, this would be a toast notification)
    alert(`✅ ${selectedMember.firstName} ${selectedMember.lastName} has been removed from the members list.`);
  };

  /**
   * Handle edit member - navigate to edit form
   */
  const handleEditClick = (member) => {
    /*
     * TODO: This section is going to be integrated with the REST API in C#, 
     * the backend area is working on that.... pending
     * Navigate to: /members/edit/{member.id}
     */
    setEditingMember(member);
    setCurrentView('edit');
  };

  /**
   * Handle view member details
   */
  const handleViewClick = (member) => {
    /*
     * TODO: This section is going to be integrated with the REST API in C#, 
     * the backend area is working on that.... pending
     * Navigate to: /members/view/{member.id}
     * Or open detailed modal
     */
    console.log('Viewing member:', member.id);
    // Navigate to member details page or open modal
  };

  /**
   * Handle add new member - navigate to create form
   */
  const handleAddNew = () => {
    /*
     * TODO: This section is going to be integrated with the REST API in C#, 
     * the backend area is working on that.... pending
     * Navigate to: /members/new
     */
    setEditingMember(null);
    setCurrentView('add');
  };

  /**
   * Handle form save (add or edit)
   */
  const handleFormSave = (memberData) => {
    if (currentView === 'add') {
      // Add new member
      setMembers(prevMembers => [...prevMembers, memberData]);
      alert(`✅ ${memberData.firstName} ${memberData.lastName} has been added to the members list successfully!`);
    } else if (currentView === 'edit') {
      // Update existing member
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === memberData.id ? memberData : member
        )
      );
      alert(`✅ ${memberData.firstName} ${memberData.lastName}'s information has been updated successfully!`);
    }
    
    // Return to list view
    setCurrentView('list');
    setEditingMember(null);
  };

  /**
   * Handle form cancel
   */
  const handleFormCancel = () => {
    setCurrentView('list');
    setEditingMember(null);
  };

  /**
   * Get status badge style
   */
  const getStatusBadge = (status) => {
    return status === 'active' ? 'status-active' : 'status-inactive';
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Show form view
  if (currentView === 'add' || currentView === 'edit') {
    return (
      <div className="members-page">
        {/* Back button */}
        <div className="back-navigation">
          <button 
            className="back-btn"
            onClick={() => setCurrentView('list')}
          >
            <FaArrowLeft /> Back to Members List
          </button>
        </div>
        
        <MemberForm
          member={editingMember}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
          isEditing={currentView === 'edit'}
        />
      </div>
    );
  }

  // Show list view
  return (
    <div className="members-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Church Members</h1>
          <p className="page-subtitle">
            Manage and search through church members and devotees
          </p>
        </div>
        <button className="btn-primary" onClick={handleAddNew}>
          <FaUserPlus /> Add New Member
        </button>
      </div>

      {/* Search and Filters Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, phone, or ministry..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                <FaTimes />
              </button>
            )}
          </div>
          
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Status:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Members</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
        )}

        {/* Search Results Summary */}
        <div className="search-summary">
          <span>
            Showing {filteredMembers.length} of {members.length} members
          </span>
          {searchTerm && (
            <span className="search-term">
              for "{searchTerm}"
            </span>
          )}
        </div>
      </div>

      {/* Members Grid */}
      <div className="members-grid">
        {filteredMembers.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-header">
              <div className="member-avatar">
                {member.photo ? (
                  <img src={member.photo} alt={`${member.firstName} ${member.lastName}`} />
                ) : (
                  <div className="avatar-placeholder">
                    {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="member-basic-info">
                <h3 className="member-name">
                  {member.firstName} {member.lastName}
                </h3>
                <span className={`status-badge ${getStatusBadge(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </div>
              <div className="member-actions">
                <button 
                  className="action-btn view-btn"
                  onClick={() => handleViewClick(member)}
                  title="View Details"
                >
                  <FaEye />
                </button>
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEditClick(member)}
                  title="Edit Member"
                >
                  <FaEdit />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteClick(member)}
                  title="Delete Member"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="member-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <span>{member.email}</span>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <span>{member.phone}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{member.address}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <span>Member since {formatDate(member.memberSince)}</span>
              </div>
            </div>

            <div className="member-ministry">
              <strong>Ministry:</strong> {member.ministry}
            </div>

            {member.notes && (
              <div className="member-notes">
                <strong>Notes:</strong> {member.notes}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No members found</h3>
          <p>
            {searchTerm 
              ? `No members match "${searchTerm}". Try adjusting your search terms.`
              : 'No members match the current filters.'
            }
          </p>
          {searchTerm && (
            <button 
              className="btn-secondary"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete <strong>
                  {selectedMember?.firstName} {selectedMember?.lastName}
                </strong> from the church members list?
              </p>
              <p className="warning-text">
                ⚠️ This action cannot be undone. All member data including contact information, 
                ministry assignments, and notes will be permanently removed.
              </p>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={confirmDelete}
              >
                <FaTrash /> Delete Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;