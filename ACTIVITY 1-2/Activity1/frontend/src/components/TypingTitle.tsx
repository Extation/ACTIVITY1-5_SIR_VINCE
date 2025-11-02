import React, { useState, useEffect } from 'react';

interface TypingTitleProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

const styles = {
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 16px 0',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  cursor: {
    display: 'inline-block',
    marginLeft: '4px',
    animation: 'blink 1s infinite',
    color: '#4CAF50',
  } as React.CSSProperties,
};

// We'll simulate CSS animation via React state
const BlinkingCursor: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      ...styles.cursor,
      opacity: visible ? 1 : 0,
    }}>
      |
    </span>
  );
};

const TypingTitle: React.FC<TypingTitleProps> = ({ 
  text, 
  speed = 150, 
  className = '',
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  return (
    <h1 style={styles.title} className={className}>
      {displayedText}
      {!isComplete && <BlinkingCursor />}
    </h1>
  );
};

export default TypingTitle;
