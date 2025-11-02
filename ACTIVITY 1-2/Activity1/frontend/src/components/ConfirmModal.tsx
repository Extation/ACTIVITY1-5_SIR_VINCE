import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  } as React.CSSProperties,
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    minWidth: '440px',
    maxWidth: '500px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'slideIn 0.3s ease-out',
  } as React.CSSProperties,
  body: {
    padding: '0 0 32px 0',
    color: '#333',
    fontSize: '17px',
    lineHeight: '1.6',
    fontWeight: '500',
  } as React.CSSProperties,
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  } as React.CSSProperties,
  button: (variant: 'confirm' | 'cancel', hovered: boolean) => ({
    padding: '12px 32px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    background: variant === 'confirm' 
      ? (hovered ? 'linear-gradient(135deg, #1a3461 0%, #244785 100%)' : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)')
      : (hovered ? '#616161' : '#757575'),
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '100px',
    boxShadow: variant === 'confirm' 
      ? (hovered ? '0 6px 20px rgba(30, 60, 114, 0.4)' : '0 4px 15px rgba(30, 60, 114, 0.3)')
      : (hovered ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.15)'),
    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
  }) as React.CSSProperties,
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  const [hoveredButton, setHoveredButton] = React.useState<'confirm' | 'cancel' | null>(null);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <div style={styles.body}>{message}</div>
        <div style={styles.footer}>
          <button
            style={styles.button('confirm', hoveredButton === 'confirm')}
            onClick={onConfirm}
            onMouseEnter={() => setHoveredButton('confirm')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            OK
          </button>
          <button
            style={styles.button('cancel', hoveredButton === 'cancel')}
            onClick={onCancel}
            onMouseEnter={() => setHoveredButton('cancel')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
