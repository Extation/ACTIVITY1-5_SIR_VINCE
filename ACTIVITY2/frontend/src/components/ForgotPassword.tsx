import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  } as React.CSSProperties,
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '48px 40px',
    maxWidth: '500px',
    width: '100%',
  } as React.CSSProperties,
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  } as React.CSSProperties,
  title: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '15px',
    color: '#64748b',
    margin: 0,
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '24px',
  } as React.CSSProperties,
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  } as React.CSSProperties,
  label: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1e293b',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  input: (focused: boolean, disabled: boolean) => ({
    padding: '14px 18px',
    fontSize: '15px',
    border: focused ? '2px solid #2193b0' : '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: disabled ? '#f8fafc' : '#ffffff',
    color: '#1e293b',
    transition: 'all 0.3s',
    boxShadow: focused ? '0 0 0 4px rgba(33, 147, 176, 0.1)' : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
  }) as React.CSSProperties,
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: '2px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
  successMessage: {
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: '2px solid #bbf7d0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
  button: (hovered: boolean, disabled: boolean) => ({
    padding: '16px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: disabled 
      ? '#cbd5e0' 
      : (hovered 
        ? 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)' 
        : 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)'),
    border: 'none',
    borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    transform: hovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: hovered && !disabled 
      ? '0 12px 24px rgba(33, 147, 176, 0.4)' 
      : '0 4px 12px rgba(33, 147, 176, 0.3)',
    marginTop: '8px',
  }) as React.CSSProperties,
  authLink: {
    textAlign: 'center' as const,
    marginTop: '24px',
    fontSize: '14px',
    color: '#64748b',
  } as React.CSSProperties,
  link: {
    color: '#2193b0',
    textDecoration: 'none',
    fontWeight: '700',
    transition: 'color 0.2s',
  } as React.CSSProperties,
};

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.requestPasswordReset({ email: email.trim() });
      setSuccess(response.message);
      
      // Navigate to verify code page after 2 seconds
      setTimeout(() => {
        navigate('/verify-reset-code', { state: { email: email.trim() } });
      }, 2000);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('If this email exists, a reset code has been sent.');
      } else {
        setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>🔐 Forgot Password</h2>
          <p style={styles.subtitle}>Enter your email to receive a reset code</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter your email"
              autoComplete="email"
              style={styles.input(focusedInput, loading)}
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
            />
          </div>
          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={styles.successMessage}>
              ✅ {success}
            </div>
          )}
          <button 
            type="submit" 
            disabled={loading} 
            style={styles.button(hoveredBtn, loading)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
          >
            {loading ? '📧 Sending...' : '📧 Send Reset Code'}
          </button>
        </form>
        <p style={styles.authLink}>
          Remember your password? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
