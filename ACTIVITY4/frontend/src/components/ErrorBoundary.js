import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>⚠️ Oops!</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Something went wrong</h2>
            <p style={{ fontSize: '1rem', marginBottom: '30px', opacity: 0.9 }}>
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#667eea',
                background: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Try Again
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '30px',
                textAlign: 'left',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '0.9rem',
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
