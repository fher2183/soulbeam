import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStickyNote } from 'react-icons/fa';
import './MemberForm.css';

/**
 * MemberForm Component
 * Form for creating and editing church members
 */
const MemberForm = ({ member, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    memberSince: '',
    status: 'active',
    ministry: '',
    emergencyContact: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Ministry options for dropdown
   * TODO: This section is going to be integrated with the REST API in C#, 
   * the backend area is working on that.... pending
   * API endpoint: GET /api/ministries/list
   * This will fetch available ministries from database
   */
  const ministryOptions = [
    'Youth Ministry',
    'Worship Team',
    'Elder Board',
    'Children Ministry',
    'Men Ministry',
    'Women Ministry',
    'Outreach Ministry',
    'Prayer Ministry',
    'Media Ministry',
    'Finance Committee'
  ];

  /**
   * Load member data if editing
   */
  useEffect(() => {
    if (isEditing && member) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        email: member.email || '',
        phone: member.phone || '',
        address: member.address || '',
        birthDate: member.birthDate || '',
        memberSince: member.memberSince || '',
        status: member.status || 'active',
        ministry: member.ministry || '',
        emergencyContact: member.emergencyContact || '',
        notes: member.notes || ''
      });
    } else {
      // Set default memberSince to today for new members
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        memberSince: today
      }));
    }
  }, [isEditing, member]);

  /**
   * Handle input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.memberSince) {
      newErrors.memberSince = 'Member since date is required';
    }

    if (!formData.ministry) {
      newErrors.ministry = 'Please select a ministry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      /*
       * TODO: This section is going to be integrated with the REST API in C#, 
       * the backend area is working on that.... pending
       * API calls:
       * - POST /api/members (for new member)
       * - PUT /api/members/{id} (for existing member)
       * This will handle server-side validation and database storage
       */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create member object to pass back
      const memberData = {
        ...formData,
        id: isEditing ? member.id : Date.now(), // Temporary ID for demo
      };

      onSave(memberData);
    } catch (error) {
      console.error('Error saving member:', error);
      // Handle error (show message to user)
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle cancel action
   */
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      onCancel();
    }
  };

  return (
    <div className="member-form-container">
      <div className="form-header">
        <h1 className="form-title">
          {isEditing ? 'Edit Member' : 'Add New Member'}
        </h1>
        <p className="form-subtitle">
          {isEditing 
            ? 'Update member information and save changes'
            : 'Fill in the basic information for the new church member'
          }
        </p>
      </div>

      <form className="member-form" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3 className="section-title">
            <FaUser /> Personal Information
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                disabled={isLoading}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                disabled={isLoading}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                className="form-input"
                value={formData.birthDate}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h3 className="section-title">
            <FaEnvelope /> Contact Information
          </h3>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              disabled={isLoading}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              className={`form-textarea ${errors.address ? 'error' : ''}`}
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              rows="3"
              disabled={isLoading}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>
        </div>

        {/* Church Information Section */}
        <div className="form-section">
          <h3 className="section-title">
            <FaUsers /> Church Information
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="memberSince" className="form-label">
                Member Since *
              </label>
              <input
                type="date"
                id="memberSince"
                name="memberSince"
                className={`form-input ${errors.memberSince ? 'error' : ''}`}
                value={formData.memberSince}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {errors.memberSince && (
                <span className="error-message">{errors.memberSince}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="ministry" className="form-label">
                Ministry *
              </label>
              <select
                id="ministry"
                name="ministry"
                className={`form-input ${errors.ministry ? 'error' : ''}`}
                value={formData.ministry}
                onChange={handleInputChange}
                disabled={isLoading}
              >
                <option value="">Select a ministry</option>
                {ministryOptions.map(ministry => (
                  <option key={ministry} value={ministry}>
                    {ministry}
                  </option>
                ))}
              </select>
              {errors.ministry && (
                <span className="error-message">{errors.ministry}</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <h3 className="section-title">
            <FaStickyNote /> Additional Information
          </h3>

          <div className="form-group">
            <label htmlFor="emergencyContact" className="form-label">
              Emergency Contact
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              className="form-input"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Name and phone number"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional notes about the member"
              rows="4"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            <FaTimes /> Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>⏳ Saving...</>
            ) : (
              <>
                <FaSave /> {isEditing ? 'Update Member' : 'Add Member'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberForm;