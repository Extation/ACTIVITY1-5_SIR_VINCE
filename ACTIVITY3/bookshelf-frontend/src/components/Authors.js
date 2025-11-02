import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

  const API_URL = 'http://localhost:3006/authors';

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      fontWeight: '300',
      marginBottom: '40px',
      color: '#000',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '20px',
    },
    form: {
      background: '#ffffff',
      padding: '40px',
      marginBottom: '60px',
      border: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    input: {
      padding: '15px 20px',
      border: 'none',
      borderBottom: '2px solid #e0e0e0',
      background: 'transparent',
      fontSize: '15px',
      fontFamily: 'inherit',
      color: '#000',
      transition: 'border-color 0.3s ease',
      width: '100%',
    },
    button: {
      padding: '15px 40px',
      border: '1px solid #000',
      background: '#000',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      transition: 'all 0.3s ease',
      marginRight: '15px',
    },
    cancelButton: {
      padding: '15px 40px',
      border: '1px solid #000',
      background: '#fff',
      color: '#000',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      transition: 'all 0.3s ease',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    item: {
      padding: '30px',
      border: '1px solid #e0e0e0',
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: 'all 0.3s ease',
    },
    itemContent: {
      flex: 1,
      paddingRight: '30px',
    },
    itemTitle: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#000',
      letterSpacing: '0.5px',
      display: 'block',
      marginBottom: '10px',
    },
    itemText: {
      fontSize: '13px',
      color: '#666',
      margin: '5px 0',
      lineHeight: '1.6',
      fontWeight: '300',
    },
    itemButtons: {
      display: 'flex',
      gap: '15px',
      flexShrink: 0,
    },
    editButton: {
      padding: '10px 20px',
      fontSize: '11px',
      border: '1px solid #e0e0e0',
      background: '#fff',
      color: '#666',
      cursor: 'pointer',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      transition: 'all 0.3s ease',
    },
    deleteButton: {
      padding: '10px 20px',
      fontSize: '11px',
      border: '1px solid #000',
      background: '#000',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: '400',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      transition: 'all 0.3s ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#999',
      fontSize: '14px',
      fontWeight: '300',
      letterSpacing: '1px',
    },
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setAuthors(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, bio }),
    });

    setName('');
    setBio('');
    setEditingId(null);
    fetchAuthors();
  };

  const handleEdit = (author) => {
    setName(author.name);
    setBio(author.bio);
    setEditingId(author.id);
  };

  const handleDelete = (id) => {
    const author = authors.find(a => a.id === id);
    setAuthorToDelete(author);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (authorToDelete) {
      await fetch(`${API_URL}/${authorToDelete.id}`, { method: 'DELETE' });
      fetchAuthors();
      setShowDeleteModal(false);
      setAuthorToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAuthorToDelete(null);
  };

  const handleCancel = () => {
    setName('');
    setBio('');
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${authorToDelete?.name}"? This action cannot be undone.`}
      />

      <h2 style={styles.heading}>Authors</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={styles.input}
          required
        />
        <div>
          <button type="submit" style={styles.button}>
            {editingId ? 'Update' : 'Create'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={styles.list}>
        {authors.length === 0 ? (
          <p style={styles.emptyState}>No authors yet.</p>
        ) : (
          authors.map((author) => (
            <div key={author.id} style={styles.item}>
              <div style={styles.itemContent}>
                <strong style={styles.itemTitle}>{author.name}</strong>
                <p style={styles.itemText}>{author.bio}</p>
              </div>
              <div style={styles.itemButtons}>
                <button onClick={() => handleEdit(author)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(author.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Authors;
