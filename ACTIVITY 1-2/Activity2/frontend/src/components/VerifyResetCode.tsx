import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    fontSize: '20px',
    border: focused ? '2px solid #2193b0' : '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: disabled ? '#f8fafc' : '#ffffff',
    color: '#1e293b',
    transition: 'all 0.3s',
    boxShadow: focused ? '0 0 0 4px rgba(33, 147, 176, 0.1)' : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    textAlign: 'center' as const,
    letterSpacing: '8px',
    fontWeight: '700',
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
  infoBox: {
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '14px',
    border: '2px solid #bfdbfe',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
};

const VerifyResetCode: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  useEffect(() => {
    // Get email from navigation state
    const stateEmail = (location.state as any)?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setCode(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.verifyResetCode({ email, code });
      setSuccess(response.message);
      
      // Navigate to reset password page after 1 second
      setTimeout(() => {
        navigate('/reset-password', { state: { email, code } });
      }, 1000);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Invalid or expired code. Please try again.');
      } else {
        setError(err.response?.data?.message || 'Failed to verify code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>🔢 Verify Code</h2>
          <p style={styles.subtitle}>Enter the 6-digit code sent to your email</p>
        </div>
        
        <div style={styles.infoBox}>
          ℹ️ Check your email (including spam folder) for the reset code
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="code" style={styles.label}>Reset Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleCodeChange}
              required
              disabled={loading}
              placeholder="000000"
              maxLength={6}
              pattern="\d{6}"
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
            disabled={loading || code.length !== 6} 
            style={styles.button(hoveredBtn, loading || code.length !== 6)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
          >
            {loading ? '🔍 Verifying...' : '🔍 Verify Code'}
          </button>
        </form>
        <p style={styles.authLink}>
          Didn't receive a code? <Link to="/forgot-password" style={styles.link}>Resend code</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyResetCode;
