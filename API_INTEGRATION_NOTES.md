# SoulBeam Church Management System - API Integration Notes

## Overview
This document outlines all the areas in the frontend application that need to be integrated with the REST API in C#. The backend area is working on that... pending.

## Authentication & Authorization

### Login System
- **File**: `src/components/Login/Login.js`
- **Current**: Demo authentication (accepts any credentials)
- **API Endpoint**: `POST /api/auth/login`
- **Features Needed**:
  - JWT token authentication
  - Role-based access control (RBAC)
  - Session management
  - Password validation
  - User roles: Admin, Pastor, Member, etc.

### User Management
- **File**: `src/components/Header/Header.js`
- **API Endpoints**:
  - `GET /api/user/profile` - Get current user info
  - `POST /api/auth/logout` - Logout user
  - `GET /api/auth/validate-token` - Validate JWT token

## Navigation & Menu System

### Dynamic Menu
- **File**: `src/components/Sidebar/Sidebar.js`
- **Current**: Static menu configuration
- **API Endpoint**: `GET /api/menu/items`
- **Features Needed**:
  - Role-based menu items
  - Dynamic menu configuration from database
  - Permission-based visibility
  - Menu item ordering and categorization

## Members Management

### Church Members/Devotees System
- **File**: `src/pages/Members/Members.js`
- **Current**: Static members data with search functionality
- **API Endpoints**:
  - `GET /api/members` - Fetch all members with pagination
  - `GET /api/members/search?q={term}&status={status}&ministry={ministry}` - Advanced search
  - `POST /api/members` - Create new member
  - `PUT /api/members/{id}` - Update member information
  - `DELETE /api/members/{id}` - Delete member
  - `GET /api/members/{id}` - Get specific member details
  - `GET /api/members/export` - Export members list to CSV/Excel
  - `POST /api/members/import` - Import members from file

### Features Needed:
- Complete member profile management
- Advanced search with filters (name, email, phone, ministry, status)
- Member photo upload and management
- Emergency contact information
- Member history and notes
- Ministry assignment tracking
- Attendance tracking integration
- Communication preferences
- Member directory with privacy controls
- Bulk operations (delete, update, export)
- Member statistics and reporting

## Dashboard Module

### Statistics Cards
- **File**: `src/pages/Dashboard/Dashboard.js`
- **API Endpoints**:
  - `GET /api/dashboard/statistics` - Get church statistics
  - `GET /api/activities/recent` - Get recent activities
  - `GET /api/events/upcoming` - Get upcoming events

## Services Management

### Services CRUD
- **File**: `src/pages/Services/Services.js`
- **Current**: Static services data
- **API Endpoints**:
  - `GET /api/services` - Fetch all services
  - `POST /api/services` - Create new service
  - `PUT /api/services/{id}` - Update service
  - `DELETE /api/services/{id}` - Delete service
  - `GET /api/services?page=1&limit=10` - Paginated services
  - `GET /api/services?type=online&pastor=Johnson` - Filtered services
  - `GET /api/services?search=worship` - Search services

### Features Needed:
- Service scheduling
- Attendance tracking
- Pastor assignment
- Capacity management
- Online streaming integration

## Ministries Management

### Ministry Programs
- **File**: `src/pages/Ministries/Ministries.js`
- **Current**: Static ministry data
- **API Endpoints**:
  - `GET /api/ministries` - Fetch all ministry programs
  - `POST /api/ministries` - Create new ministry
  - `PUT /api/ministries/{id}` - Update ministry details
  - `DELETE /api/ministries/{id}` - Remove ministry
  - `GET /api/ministries/categories` - Fetch ministry categories

### Features Needed:
- Member enrollment
- Leader assignment
- Activity tracking
- Age group management

## Bible School & Education

### Educational Programs
- **File**: `src/pages/BibleSchool/BibleSchool.js`
- **Current**: Static programs data
- **API Endpoints**:
  - `GET /api/bible-school/programs` - Fetch all study programs
  - `POST /api/bible-school/programs` - Create new program
  - `PUT /api/bible-school/programs/{id}` - Update program
  - `DELETE /api/bible-school/programs/{id}` - Remove program
  - `GET /api/bible-school/enrollments` - Get student enrollments
  - `POST /api/bible-school/enroll` - Enroll student in program

### Features Needed:
- Student registration
- Curriculum management
- Progress tracking
- Certificate generation

## Events Management

### Event System
- **File**: `src/pages/Events/Events.js`
- **Current**: Static events data
- **API Endpoints**:
  - `GET /api/events` - Fetch all events
  - `POST /api/events` - Create new event
  - `PUT /api/events/{id}` - Update event details
  - `DELETE /api/events/{id}` - Cancel event
  - `GET /api/events/registrations/{id}` - Get event registrations
  - `POST /api/events/register` - Register for event

### Features Needed:
- Event registration system
- Capacity management
- Payment integration (for paid events)
- Email notifications
- Calendar integration

## Broadcasts & Media

### Broadcasting System
- **File**: `src/pages/Broadcasts/Broadcasts.js`
- **Current**: Static broadcast data
- **API Endpoints**:
  - `GET /api/broadcasts` - Fetch all broadcast channels
  - `POST /api/broadcasts` - Create new broadcast
  - `PUT /api/broadcasts/{id}` - Update broadcast info
  - `DELETE /api/broadcasts/{id}` - Remove broadcast
  - `GET /api/social-media/stats` - Get social media statistics

### Features Needed:
- Live streaming integration
- Social media API integration
- Recording management
- Viewer analytics
- Schedule management

## Notifications System

### Real-time Notifications
- **File**: `src/components/Header/Header.js`
- **Current**: Static notification count
- **API Endpoints**:
  - `GET /api/notifications/unread` - Get unread notifications
  - `POST /api/notifications/mark-read/{id}` - Mark as read
  - `GET /api/notifications/all` - Get all notifications

### Features Needed:
- Real-time updates (SignalR)
- Push notifications
- Email notifications
- SMS notifications
- Notification preferences

## Common Features Needed Across All Modules

### Data Management
- Server-side pagination
- Advanced filtering and sorting
- Search functionality
- Data validation
- Error handling
- Loading states

### Security
- JWT token management
- Role-based permissions
- API rate limiting
- Input sanitization
- CORS configuration

### Performance
- Caching strategies
- Database optimization
- Image optimization
- Lazy loading
- Code splitting

## Database Schema Suggestions

### Core Tables Needed:
- Users (authentication, roles, profiles)
- MenuItems (dynamic navigation)
- **Members (church membership, contact info, photos, notes, emergency contacts)**
- Services (service management)
- Ministries (ministry programs)
- Events (event management)
- BibleSchoolPrograms (educational content)
- Broadcasts (media management)
- Notifications (system notifications)
- Attendance (tracking)
- Registrations (event/program enrollment)
- **MemberMinistries (many-to-many relationship)**
- **MemberNotes (historical notes and comments)**
- **MemberPhotos (profile pictures and gallery)**

## Technology Stack Recommendations

### Backend (C#)
- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- SignalR (real-time features)
- AutoMapper
- FluentValidation

### Database
- SQL Server or PostgreSQL
- Redis (caching)

### Additional Services
- File storage (Azure Blob, AWS S3)
- Email service (SendGrid, AWS SES)
- SMS service (Twilio)
- Social media APIs

## Implementation Priority

### Phase 1 (Essential)
1. Authentication system
2. User management
3. Dynamic menu system
4. Basic CRUD for all modules

### Phase 2 (Enhanced Features)
1. Advanced search and filtering
2. Notification system
3. File upload capabilities
4. Reporting features

### Phase 3 (Advanced Features)
1. Real-time updates
2. Mobile app integration
3. Advanced analytics
4. Third-party integrations

---

**Note**: All frontend components currently use static data for demonstration purposes. Once the backend REST API is ready, these will be replaced with actual API calls as indicated by the TODO comments throughout the codebase.