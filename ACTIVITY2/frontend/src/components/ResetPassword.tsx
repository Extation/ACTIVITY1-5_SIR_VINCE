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
  passwordStrength: {
    marginTop: '8px',
  } as React.CSSProperties,
  strengthBar: {
    height: '6px',
    borderRadius: '3px',
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: '8px',
  } as React.CSSProperties,
  strengthFill: (strength: number) => ({
    height: '100%',
    width: `${strength}%`,
    backgroundColor: 
      strength < 40 ? '#ef4444' : 
      strength < 70 ? '#f59e0b' : 
      '#22c55e',
    transition: 'all 0.3s',
  }) as React.CSSProperties,
  strengthText: (strength: number) => ({
    fontSize: '12px',
    fontWeight: '600',
    color: 
      strength < 40 ? '#ef4444' : 
      strength < 70 ? '#f59e0b' : 
      '#22c55e',
  }) as React.CSSProperties,
  matchIndicator: (matches: boolean, hasConfirm: boolean) => ({
    fontSize: '13px',
    fontWeight: '600',
    color: !hasConfirm ? '#64748b' : (matches ? '#22c55e' : '#ef4444'),
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '4px',
  }) as React.CSSProperties,
  requirements: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '8px',
    lineHeight: '1.6',
  } as React.CSSProperties,
  requirement: (met: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: met ? '#22c55e' : '#64748b',
  }) as React.CSSProperties,
};

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  useEffect(() => {
    // Get email and code from navigation state
    const state = location.state as any;
    if (state?.email && state?.code) {
      setEmail(state.email);
      setCode(state.code);
    } else {
      // If no email/code in state, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const passwordStrength = calculatePasswordStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const hasMinLength = newPassword.length >= 6;
  const hasUpperLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);

  const getStrengthText = (strength: number): string => {
    if (strength < 40) return 'Weak';
    if (strength < 70) return 'Medium';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.resetPassword({ 
        email, 
        code, 
        newPassword 
      });
      setSuccess(response.message);
      
      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Invalid or expired code. Please request a new reset code.');
      } else {
        setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>🔐 Reset Password</h2>
          <p style={styles.subtitle}>Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter new password"
              minLength={6}
              style={styles.input(focusedInput === 'newPassword', loading)}
              onFocus={() => setFocusedInput('newPassword')}
              onBlur={() => setFocusedInput(null)}
            />
            {newPassword && (
              <div style={styles.passwordStrength}>
                <div style={styles.strengthBar}>
                  <div style={styles.strengthFill(passwordStrength)}></div>
                </div>
                <div style={styles.strengthText(passwordStrength)}>
                  Password Strength: {getStrengthText(passwordStrength)}
                </div>
                <div style={styles.requirements}>
                  <div style={styles.requirement(hasMinLength)}>
                    {hasMinLength ? '✓' : '○'} At least 6 characters
                  </div>
                  <div style={styles.requirement(hasUpperLower)}>
                    {hasUpperLower ? '✓' : '○'} Uppercase & lowercase letters
                  </div>
                  <div style={styles.requirement(hasNumber)}>
                    {hasNumber ? '✓' : '○'} Contains a number
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Confirm new password"
              minLength={6}
              style={styles.input(focusedInput === 'confirmPassword', loading)}
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
            />
            {confirmPassword && (
              <div style={styles.matchIndicator(passwordsMatch, confirmPassword.length > 0)}>
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
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
            disabled={loading || !passwordsMatch || newPassword.length < 6} 
            style={styles.button(hoveredBtn, loading || !passwordsMatch || newPassword.length < 6)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
          >
            {loading ? '🔄 Resetting...' : '🔐 Reset Password'}
          </button>
        </form>
        <p style={styles.authLink}>
          Remember your password? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
