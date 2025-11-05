import React, { useState } from 'react';
import './Login.css';

/**
 * Login Component
 * Handles user authentication with blue and white theme
 * @param {Function} onLogin - Callback function when login is successful
 */
const Login = ({ onLogin }) => {
  // State management for form inputs and validation
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle input changes in the form
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    /*
     * TODO: This section is going to be integrated with the REST API in C#, 
     * the backend area is working on that.... pending
     * API endpoint: POST /api/auth/login
     * This will handle proper authentication with JWT tokens
     * and role-based access control (RBAC)
     */
    // Simulate API call delay - REMOVE THIS IN PRODUCTION
    setTimeout(() => {
      // For demo purposes, accept any non-empty credentials
      // In production, this would be an actual API call
      if (formData.username && formData.password) {
        onLogin();
      } else {
        setError('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay">
          <div className="login-card">
            {/* Logo and Header */}
            <div className="login-header">
              <div className="logo">
                <div className="logo-icon">✨</div>
                <h1 className="logo-text">SoulBeam</h1>
              </div>
              <p className="login-subtitle">Welcome Back</p>
              <p className="login-description">
                Sign in to access your church management system
              </p>
            </div>

            {/* Login Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">⏳ Signing in...</span>
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="login-footer">
                <p className="demo-info">
                  <strong>Demo Login:</strong> Use any username and password
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;