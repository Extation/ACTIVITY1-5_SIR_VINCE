import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Business Travel',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(file);
        setImagePreview(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await postsAPI.createPost(formData, selectedImage);
      navigate(`/posts/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">
                <i className="fas fa-edit me-2"></i>
                Create New Post
              </h2>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    <i className="fas fa-tag me-2"></i>
                    Category
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Business Travel">Business Travel</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Sports">Sports</option>
                    <option value="Education">Education</option>
                    <option value="Finance">Finance</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="form-text">
                    Select a category that best describes your post
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    <i className="fas fa-heading me-2"></i>
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter an engaging title for your post"
                    maxLength="200"
                  />
                  <div className="form-text">
                    {formData.title.length}/200 characters
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    <i className="fas fa-align-left me-2"></i>
                    Post Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    rows="12"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="Share your thoughts, stories, or insights..."
                  ></textarea>
                  <div className="form-text">
                    Write your post content here. You can use line breaks for paragraphs.
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="form-label">
                    <i className="fas fa-image me-2"></i>
                    Post Image (Optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="form-text">
                    Upload an image to make your post more engaging. Supported formats: JPG, PNG, GIF (max 5MB)
                  </div>
                  {imagePreview && (
                    <div className="mt-3 position-relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid rounded"
                        style={{ maxHeight: '300px', width: '100%', objectFit: 'cover' }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                        onClick={removeImage}
                        title="Remove image"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/')}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading || !formData.title.trim() || !formData.content.trim()}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Publishing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Publish Post
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Writing Tips */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-lightbulb text-warning me-2"></i>
                Writing Tips
              </h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li>Choose a clear and engaging title that summarizes your post</li>
                <li>Start with a compelling introduction to hook your readers</li>
                <li>Use paragraphs to break up your content and make it easier to read</li>
                <li>End with a conclusion or call-to-action to engage your audience</li>
                <li>Proofread your post before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
