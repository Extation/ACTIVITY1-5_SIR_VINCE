import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = ({ onSearch, searchValue = '' }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to home if not already there
    if (location.pathname !== '/') {
      navigate('/');
    }
    // Call the search callback if provided
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Real-time search on home page
    if (location.pathname === '/' && onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  // Update local search query when prop changes
  React.useEffect(() => {
    setSearchQuery(searchValue);
  }, [searchValue]);

  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Search Bar */}
        <div className="header-search">
          <form onSubmit={handleSearch}>
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search posts by title, content, category, or author..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchQuery && (
              <button 
                type="button"
                className="clear-search-nav"
                onClick={handleClearSearch}
                title="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </form>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="header-brand">
          DEV.inci Blog
        </Link>

        {/* Social Icons & Menu */}
        <div className="header-actions">
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          {/* Hamburger Menu */}
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${menuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="dropdown-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="dropdown-menu-content" onClick={(e) => e.stopPropagation()}>
            <nav className="menu-nav">
              <Link to="/" className="menu-link" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-home"></i>
                Home
              </Link>
              
              {isAuthenticated && isAdmin && (
                <Link to="/create-post" className="menu-link" onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-plus"></i>
                  Create Post
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="menu-divider"></div>
                  <div className="menu-user">
                    <i className="fas fa-user-circle"></i>
                    <span>{user?.username}</span>
                  </div>
                  <Link to="/profile" className="menu-link" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-user"></i>
                    Profile
                  </Link>
                  <button className="menu-link menu-logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="menu-divider"></div>
                  <Link to="/login" className="menu-link" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </Link>
                  <Link to="/register" className="menu-link" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-user-plus"></i>
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
