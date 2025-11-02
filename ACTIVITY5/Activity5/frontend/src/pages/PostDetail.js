/**
 * React component for displaying detailed view of a single blog post.
 * Includes post content, author information, comments section, and interaction features.
 * Allows authenticated users to add comments and post authors to edit/delete their posts.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI, commentsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(id);
      setPost(response.data);
    } catch (err) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await commentsAPI.getCommentsByPost(id);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await commentsAPI.createComment({
        content: commentText,
        postId: parseInt(id),
      });
      setCommentText('');
      fetchComments(); // Refresh comments
    } catch (err) {
      setError('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.deletePost(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentsAPI.deleteComment(commentId);
        fetchComments(); // Refresh comments
      } catch (err) {
        setError('Failed to delete comment');
      }
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

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {post && (
        <>
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home me-1"></i>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
              </li>
            </ol>
          </nav>

          {/* Post Content */}
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <article className="card shadow">
                {post.imageUrl && (
                  <div className="position-relative">
                    <img
                      src={`http://localhost:3005${post.imageUrl}`}
                      className="card-img-top"
                      alt={post.title}
                      style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-primary fs-6">
                        <i className="fas fa-image me-1"></i>
                        Featured Image
                      </span>
                    </div>
                  </div>
                )}

                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h1 className="card-title display-5 fw-bold mb-2">{post.title}</h1>
                      <div className="text-muted small">
                        <i className="fas fa-user me-1"></i>
                        <span className="fw-medium">{post.author?.username || 'Anonymous'}</span>
                        <span className="mx-2">•</span>
                        <i className="fas fa-calendar me-1"></i>
                        {formatDate(post.createdAt)}
                        <span className="mx-2">•</span>
                        <i className="fas fa-clock me-1"></i>
                        {Math.ceil(post.content.length / 200)} min read
                      </div>
                    </div>

                    {user && user.id === post.authorId && (
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-secondary btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link className="dropdown-item" to={`/edit-post/${post.id}`}>
                              <i className="fas fa-edit me-2"></i>
                              Edit Post
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={handleDeletePost}
                            >
                              <i className="fas fa-trash me-2"></i>
                              Delete Post
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="post-content">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index} className={paragraph.trim() ? '' : 'mb-2'}>
                        {paragraph || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                      <i className="fas fa-comments me-1"></i>
                      {comments.length} comment{comments.length !== 1 ? 's' : ''}
                    </div> 
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="card mt-4 shadow">
                <div className="card-header bg-primary text-white">
                  <h3 className="card-title mb-0">
                    <i className="fas fa-comments me-2"></i>
                    Comments ({comments.length})
                  </h3>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger mb-3" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  {/* Comment Form */}
                  {isAuthenticated ? (
                    <form onSubmit={handleCommentSubmit} className="mb-4">
                      <div className="mb-3">
                        <label htmlFor="commentText" className="form-label fw-bold">
                          <i className="fas fa-comment-dots me-2"></i>
                          Add a Comment
                        </label>
                        <textarea
                          className="form-control"
                          id="commentText"
                          rows="3"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your thoughts about this post..."
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submittingComment || !commentText.trim()}
                      >
                        {submittingComment ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Posting...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Post Comment
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="alert alert-info mb-4">
                      <i className="fas fa-info-circle me-2"></i>
                      <Link to="/login" className="text-decoration-none">
                        Login
                      </Link> to join the conversation and leave a comment.
                    </div>
                  )}

                  {/* Comments List */}
                  {comments.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="fas fa-comment-slash fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No comments yet</h5>
                      <p className="text-muted">
                        {isAuthenticated
                          ? "Be the first to share your thoughts!"
                          : "Login to start the conversation!"
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="comments-list">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-bottom pb-3 mb-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex align-items-center mb-2">
                              <i className="fas fa-user-circle text-secondary me-2 fa-lg"></i>
                              <div>
                                <strong>{comment.author?.username || 'Anonymous'}</strong>
                                <br />
                                <small className="text-muted">
                                  <i className="fas fa-clock me-1"></i>
                                  {formatDate(comment.createdAt)}
                                </small>
                              </div>
                            </div>
                            {user && user.id === comment.authorId && (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDeleteComment(comment.id)}
                                title="Delete comment"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </div>
                          <p className="mb-0 ms-4">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
