import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface RegisterProps {
  onLogin: () => void;
}

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
  input: (focused: boolean, disabled: boolean, hasError: boolean = false) => ({
    padding: '14px 18px',
    fontSize: '15px',
    border: hasError 
      ? '2px solid #ef4444' 
      : (focused ? '2px solid #2193b0' : '2px solid #e2e8f0'),
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: disabled ? '#f8fafc' : (hasError ? '#fef2f2' : '#ffffff'),
    color: '#1e293b',
    transition: 'all 0.3s',
    boxShadow: hasError 
      ? '0 0 0 4px rgba(239, 68, 68, 0.1)' 
      : (focused ? '0 0 0 4px rgba(33, 147, 176, 0.1)' : 'none'),
    cursor: disabled ? 'not-allowed' : 'text',
  }) as React.CSSProperties,
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
  strengthFill: (strength: number) => {
    let color = '#ef4444'; // Red
    let width = '25%';
    
    if (strength >= 4) {
      color = '#22c55e'; // Green
      width = '100%';
    } else if (strength >= 3) {
      color = '#84cc16'; // Light green
      width = '75%';
    } else if (strength >= 2) {
      color = '#f59e0b'; // Orange
      width = '50%';
    }
    
    return {
      height: '100%',
      backgroundColor: color,
      width: width,
      transition: 'all 0.3s',
    } as React.CSSProperties;
  },
  strengthText: (strength: number) => {
    let color = '#ef4444';
    let text = 'Weak';
    
    if (strength >= 4) {
      color = '#22c55e';
      text = 'Strong';
    } else if (strength >= 3) {
      color = '#84cc16';
      text = 'Good';
    } else if (strength >= 2) {
      color = '#f59e0b';
      text = 'Fair';
    }
    
    return {
      fontSize: '13px',
      fontWeight: '600',
      color: color,
    } as React.CSSProperties;
  },
  passwordMatch: (matches: boolean) => ({
    fontSize: '13px',
    fontWeight: '600',
    color: matches ? '#22c55e' : '#ef4444',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
    fontWeight: met ? '600' : '400',
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
  fieldError: {
    fontSize: '12px',
    color: '#ef4444',
    fontWeight: '600',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  } as React.CSSProperties,
};

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const navigate = useNavigate();

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return Math.min(strength, 4);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && 
                         formData.password === formData.confirmPassword;
  const showPasswordMismatch = formData.confirmPassword && !passwordsMatch;

  // Password requirements
  const requirements = {
    minLength: formData.password.length >= 6,
    hasUpperLower: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSpecial: /[^A-Za-z0-9]/.test(formData.password),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: '',
      });
    }
    // Clear general error when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Only letters, numbers, and underscores allowed';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (passwordStrength < 2) {
      errors.password = 'Password is too weak';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);

    // Set general error message
    if (Object.keys(errors).length > 0) {
      setError('Please fill out all required fields correctly');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Always validate and show all errors on submit
    if (!validateForm()) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      authService.setAuth(response);
      onLogin();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error:', err);
      
      if (err.response?.status === 409 || err.response?.status === 400) {
        const message = err.response?.data?.message || '';
        if (message.toLowerCase().includes('username')) {
          setError('Username already exists. Please choose a different username.');
        } else if (message.toLowerCase().includes('email')) {
          setError('Email already registered. Please use a different email or login.');
        } else {
          setError(message || 'User already exists. Please try logging in.');
        }
      } else if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}> Create Your Account </h2>
          <p style={styles.subtitle}>Join us to start organizing your notes</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              placeholder="Choose a unique username"
              autoComplete="username"
              minLength={3}
              style={styles.input(focusedField === 'username', loading, !!fieldErrors.username)}
              onFocus={() => setFocusedField('username')}
              onBlur={() => setFocusedField(null)}
            />
            {fieldErrors.username && (
              <div style={styles.fieldError}>
                ⚠ {fieldErrors.username}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              placeholder="your.email@example.com"
              autoComplete="email"
              style={styles.input(focusedField === 'email', loading, !!fieldErrors.email)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />
            {fieldErrors.email && (
              <div style={styles.fieldError}>
                ⚠ {fieldErrors.email}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              minLength={6}
              placeholder="Create a strong password"
              autoComplete="new-password"
              style={styles.input(focusedField === 'password', loading, !!fieldErrors.password)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />
            {fieldErrors.password && (
              <div style={styles.fieldError}>
                ⚠ {fieldErrors.password}
              </div>
            )}
            {formData.password && (
              <div style={styles.passwordStrength}>
                <div style={styles.strengthBar}>
                  <div style={styles.strengthFill(passwordStrength)} />
                </div>
                <div style={styles.strengthText(passwordStrength)}>
                  Password strength: {passwordStrength >= 4 ? 'Strong' : passwordStrength >= 3 ? 'Good' : passwordStrength >= 2 ? 'Fair' : 'Weak'}
                </div>
                <div style={styles.requirements}>
                  <div style={styles.requirement(requirements.minLength)}>
                    {requirements.minLength ? '✓' : '○'} At least 6 characters
                  </div>
                  <div style={styles.requirement(requirements.hasUpperLower)}>
                    {requirements.hasUpperLower ? '✓' : '○'} Upper & lowercase letters
                  </div>
                  <div style={styles.requirement(requirements.hasNumber)}>
                    {requirements.hasNumber ? '✓' : '○'} Contains a number
                  </div>
                  <div style={styles.requirement(requirements.hasSpecial)}>
                    {requirements.hasSpecial ? '✓' : '○'} Special character (!@#$%)
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
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              minLength={6}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              style={styles.input(focusedField === 'confirmPassword', loading, !!fieldErrors.confirmPassword)}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
            />
            {fieldErrors.confirmPassword && (
              <div style={styles.fieldError}>
                ⚠ {fieldErrors.confirmPassword}
              </div>
            )}
            {formData.confirmPassword && !fieldErrors.confirmPassword && (
              <div style={styles.passwordMatch(!showPasswordMismatch)}>
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>

          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={styles.button(hoveredButton, loading)}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
          >
            {loading ? '🔄 Creating Account...' : '✨ Create Account'}
          </button>
        </form>
        <p style={styles.authLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
