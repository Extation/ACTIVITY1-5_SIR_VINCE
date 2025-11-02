import React from 'react';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      background: '#fff',
      padding: '40px',
      maxWidth: '500px',
      width: '90%',
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    title: {
      fontSize: '18px',
      fontWeight: '400',
      color: '#000',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      marginBottom: '20px',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '15px',
    },
    message: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.8',
      marginBottom: '30px',
      fontWeight: '300',
    },
    buttonContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      padding: '12px 30px',
      border: '1px solid #e0e0e0',
      background: '#fff',
      color: '#666',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      transition: 'all 0.3s ease',
    },
    confirmButton: {
      padding: '12px 30px',
      border: '1px solid #000',
      background: '#000',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.confirmButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
