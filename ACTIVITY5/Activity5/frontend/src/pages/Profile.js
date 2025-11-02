import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usersAPI } from '../services/api';

const Profile = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [activityLoading, setActivityLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activities, setActivities] = useState([]);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        newPassword: '',
        confirmPassword: '',
      });
      fetchUserActivity();
    }
  }, [isAuthenticated, user, navigate]);

  const fetchUserActivity = async () => {
    try {
      setActivityLoading(true);
      const response = await usersAPI.getUserActivity(user.id);
      setActivities(response.data.activities || []);
    } catch (err) {
      console.error('Error fetching activity:', err);
    } finally {
      setActivityLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.username.trim() || !formData.email.trim()) {
      setError('Username and email are required');
      return;
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    try {
      setLoading(true);
      
      const updateData = {
        username: formData.username,
        email: formData.email,
      };

      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await usersAPI.updateUser(user.id, updateData);
      
      // Update user in context
      updateUser(response.data);
      
      setSuccess('Profile updated successfully!');
      
      // Clear password fields
      setFormData({
        ...formData,
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content || typeof content !== 'string') return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-role">
              <i className={`fas fa-${user.role === 'admin' ? 'crown' : 'user'}`}></i>
              {user.role === 'admin' ? 'Administrator' : 'User'}
            </p>
            <p className="profile-joined">
              <i className="fas fa-calendar"></i>
              Joined {formatDate(user.createdAt)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </button>
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <i className="fas fa-history"></i>
            Activity Log
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="edit-profile-section">
              <h2>Edit Profile</h2>
              
              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              {success && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle me-2"></i>
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="username">
                    <i className="fas fa-user"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-divider">
                  <span>Change Password (Optional)</span>
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">
                    <i className="fas fa-key"></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <i className="fas fa-check-double"></i>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-section">
              <h2>Activity Log</h2>
              <p className="activity-description">
                View all your posts and comments in chronological order
              </p>

              {activityLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading activity...</p>
                </div>
              ) : activities.length === 0 ? (
                <div className="empty-activity">
                  <i className="fas fa-inbox"></i>
                  <h3>No Activity Yet</h3>
                  <p>You haven't created any posts or comments yet.</p>
                  {user.role === 'admin' && (
                    <Link to="/create-post" className="btn-create">
                      <i className="fas fa-plus me-2"></i>
                      Create Your First Post
                    </Link>
                  )}
                </div>
              ) : (
                <div className="activity-list">
                  {activities.map((activity, index) => (
                    <div key={`${activity.type}-${activity.id}-${index}`} className="activity-item">
                      <div className="activity-icon">
                        <i className={`fas fa-${activity.type === 'post' ? 'file-alt' : 'comment'}`}></i>
                      </div>
                      <div className="activity-content">
                        <div className="activity-header">
                          <span className="activity-type">
                            {activity.type === 'post' ? 'Created a post' : 'Commented on a post'}
                          </span>
                          <span className="activity-date">{formatDate(activity.createdAt)}</span>
                        </div>
                        
                        {activity.type === 'post' ? (
                          <>
                            <h4 className="activity-title">
                              <Link to={`/posts/${activity.id}`}>
                                {activity.title}
                              </Link>
                            </h4>
                            <p className="activity-excerpt">
                              {truncateContent(activity.content)}
                            </p>
                            {activity.category && (
                              <span className="activity-category">{activity.category}</span>
                            )}
                          </>
                        ) : (
                          <>
                            <p className="activity-comment">
                              {truncateContent(activity.content, 150)}
                            </p>
                            {activity.postTitle && (
                              <p className="activity-post-ref">
                                On post: <Link to={`/posts/${activity.postId}`}>{activity.postTitle}</Link>
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
