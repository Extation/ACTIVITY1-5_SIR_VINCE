import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface LoginProps {
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

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '', // This field is used for email input
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('\n🔵 ===== LOGIN FORM SUBMISSION STARTED =====');
    console.log('Raw form data:', { 
      username: formData.username, 
      password: '***' + (formData.password?.substring(formData.password.length - 3) || '')
    });
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed');
    setError('');
    setLoading(true);

    // Create clean data object
    const loginData = {
      username: formData.username.trim(),
      password: formData.password
    };

    console.log('📤 Prepared login data:', {
      username: loginData.username,
      usernameLength: loginData.username.length,
      usernameType: typeof loginData.username,
      passwordLength: loginData.password.length,
      passwordType: typeof loginData.password,
      passwordLastChars: '***' + (loginData.password?.substring(loginData.password.length - 3) || '')
    });

    try {
      console.log('🔵 Calling authService.login()...');
      const response = await authService.login(loginData);
      console.log('✅ Login successful! Response:', {
        user: response.user?.username,
        email: response.user?.email,
        hasToken: !!response.access_token
      });
      authService.setAuth(response);
      onLogin();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('❌ ===== LOGIN FAILED =====');
      console.error('Error object:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error code:', err.code);
      
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (err.response?.status === 404) {
        setError('User not found. Please check your email or register.');
      } else if (err.response?.status === 400) {
        // Validation error from backend
        const message = err.response?.data?.message;
        console.error('400 Validation error:', message);
        setError(message || 'Invalid input. Please check your email and password.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
      console.log('🔵 ===== LOGIN ATTEMPT ENDED =====\n');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}> Welcome to Lanesra Note </h2>
          <p style={styles.subtitle}>Sign in to access your Lanesra notes</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Email</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your email"
              autoComplete="email"
              style={styles.input(focusedInput === 'username', loading)}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter your password"
              autoComplete="current-password"
              minLength={6}
              style={styles.input(focusedInput === 'password', loading)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <Link 
                to="/forgot-password" 
                style={{ 
                  color: '#2193b0',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1a7a94'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2193b0'}
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {error && (
            <div style={styles.errorMessage}>
              ⚠️ {error}
            </div>
          )}
          <button 
            type="submit" 
            disabled={loading} 
            style={styles.button(hoveredBtn, loading)}
            onMouseEnter={() => setHoveredBtn(true)}
            onMouseLeave={() => setHoveredBtn(false)}
          >
            {loading ? '🔄 Logging in...' : '🔓 Login'}
          </button>
        </form>
        <p style={styles.authLink}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
