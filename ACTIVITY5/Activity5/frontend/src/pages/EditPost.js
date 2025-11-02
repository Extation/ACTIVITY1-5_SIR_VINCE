import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await postsAPI.getPost(id);
      const postData = response.data;

      // Check if user is the author or an admin
      if (!user || (user.id !== postData.authorId && user.role !== 'admin')) {
        navigate('/');
        return;
      }

      setPost(postData);
      setFormData({
        title: postData.title,
        content: postData.content,
        category: postData.category || 'Business Travel',
      });
      if (postData.imageUrl) {
        setImagePreview(`http://localhost:3005${postData.imageUrl}`);
      }
    } catch (err) {
      setError('Failed to fetch post');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      if (imageFile) {
        data.append('image', imageFile);
      }

      await postsAPI.updatePost(id, data);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
    } finally {
      setSubmitting(false);
    }
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
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="fas fa-home me-1"></i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/posts/${id}`}>Post</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Post
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">
                <i className="fas fa-edit me-2"></i>
                Edit Post
              </h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-bold">
                    <i className="fas fa-heading me-2"></i>
                    Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter post title..."
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label htmlFor="content" className="form-label fw-bold">
                    <i className="fas fa-align-left me-2"></i>
                    Content *
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows="10"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your post content here..."
                    required
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label fw-bold">
                    <i className="fas fa-image me-2"></i>
                    Featured Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <small className="form-text text-muted">
                    Supported formats: JPG, JPEG, PNG, GIF. Max size: 5MB
                  </small>
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image Preview</label>
                    <div className="border rounded p-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Update Post
                      </>
                    )}
                  </button>
                  <Link to={`/posts/${id}`} className="btn btn-outline-secondary">
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
