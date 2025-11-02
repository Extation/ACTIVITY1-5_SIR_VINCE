/**
 * React component for the Home page of the Blog Platform.
 * Displays a list of blog posts with pagination, search, and user interaction features.
 * Allows authenticated users to create new posts and view/edit their own posts.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Home = ({ searchQuery = '', onSearchChange }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const { isAuthenticated, user, isAdmin } = useAuth();

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  // Auto-rotate featured posts every 5 seconds (only first 3 posts)
  useEffect(() => {
    if (filteredPosts.length > 1) {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % Math.min(3, filteredPosts.length));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredPosts.length]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.author?.username && post.author.username.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const response = await postsAPI.getAllPosts(page, 10);
      const fetchedPosts = response.data.data || [];
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts);
      setTotalPages(response.data.totalPages || 1);
      setError('');
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
      setPosts([]);
      setFilteredPosts([]);
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

  const truncateContent = (content, maxLength = 200) => {
    if (!content || typeof content !== 'string') return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading && posts.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-home">
      <div className="home-container">
        {/* Trending Section Header */}
        <div className="trending-header">
          <h1 className="trending-title">Trending</h1>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="search-results-info">
            <p>
              Found <strong>{filteredPosts.length}</strong> result{filteredPosts.length !== 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {/* Featured Post Section */}
        {filteredPosts.length > 0 && (
          <div className="featured-post-section">
            <div className="featured-post">
              <div className="featured-image">
                {filteredPosts[featuredIndex].imageUrl ? (
                  <img
                    src={`http://localhost:3005${filteredPosts[featuredIndex].imageUrl}`}
                    alt={filteredPosts[featuredIndex].title}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="placeholder-image">
                    <i className="fas fa-image"></i>
                  </div>
                )}
              </div>
              <div className="featured-content">
                <div className="post-category">
                  <span className="category-badge">{filteredPosts[featuredIndex].category || 'Business Travel'}</span>
                  <span className="post-date">— {new Date(filteredPosts[featuredIndex].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h2 className="featured-title">
                  <Link to={`/posts/${filteredPosts[featuredIndex].id}`}>
                    {filteredPosts[featuredIndex].title}
                  </Link>
                </h2>
                <p className="featured-excerpt">
                  {truncateContent(filteredPosts[featuredIndex].content, 250)}
                </p>
                <div className="post-author">
                  <div className="author-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="author-info">
                    <div className="author-name">{filteredPosts[featuredIndex].author?.username || 'Anonymous'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel Dots - Only for first 3 posts */}
            {filteredPosts.length > 1 && (
              <div className="carousel-dots">
                {[...Array(Math.min(3, filteredPosts.length))].map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${featuredIndex === index ? 'active' : ''}`}
                    onClick={() => setFeaturedIndex(index)}
                  ></span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Posts Grid */}
        <div className="posts-grid">
          {filteredPosts.length === 0 && !loading ? (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>{searchQuery ? 'No posts found' : 'No posts yet'}</h3>
              <p>{searchQuery ? `No posts match "${searchQuery}". Try a different search term.` : 'Be the first to share your story!'}</p>
              {searchQuery && onSearchChange && (
                <button 
                  className="btn btn-primary"
                  onClick={() => onSearchChange('')}
                >
                  <i className="fas fa-times me-2"></i>
                  Clear Search
                </button>
              )}
              {isAuthenticated && isAdmin && (
                <Link to="/create-post" className="btn-create">
                  <i className="fas fa-plus"></i>
                  Create Your First Post
                </Link>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-image">
                  {post.imageUrl ? (
                    <img
                      src={`http://localhost:3005${post.imageUrl}`}
                      alt={post.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="placeholder-image-small">
                      <i className="fas fa-image"></i>
                    </div>
                  )}
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="category-badge">{post.category || 'Business Travel'}</span>
                    <span className="post-date">— {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="post-title">
                    <Link to={`/posts/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="post-excerpt">
                    {truncateContent(post.content, 150)}
                  </p>
                  <div className="post-footer">
                    <div className="post-author-small">
                      <div className="author-avatar-small">
                        <i className="fas fa-user-circle"></i>
                      </div>
                      <div className="author-details">
                        <div className="author-name-small">{post.author?.username || 'Anonymous'}</div>
                      </div>
                    </div>
                    {user && user.id === post.authorId && (
                      <Link
                        to={`/edit-post/${post.id}`}
                        className="btn-edit"
                        title="Edit Post"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="row mt-4">
          <div className="col-12">
            <nav aria-label="Posts pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Previous
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <i className="fas fa-chevron-right ms-1"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
