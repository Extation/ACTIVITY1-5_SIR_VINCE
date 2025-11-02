import React, { useState, useEffect } from 'react';
import ConfirmModal from './ConfirmModal';

function Books() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

const API_URL = 'http://localhost:3006/books';

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
    select: {
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
    textarea: {
      padding: '15px 20px',
      border: '1px solid #e0e0e0',
      background: 'transparent',
      fontSize: '15px',
      fontFamily: 'inherit',
      color: '#000',
      resize: 'vertical',
      minHeight: '100px',
      lineHeight: '1.8',
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
    fetchBooks();
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('http://localhost:3006/authors');
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3006/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !authorId || !categoryId || !publishedYear || !isbn || !description) {
      alert('Please fill in all fields');
      return;
    }

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          authorId: parseInt(authorId),
          categoryId: parseInt(categoryId),
          publishedYear: parseInt(publishedYear),
          isbn,
          description,
        }),
      });

      setTitle('');
      setAuthorId('');
      setCategoryId('');
      setPublishedYear('');
      setIsbn('');
      setDescription('');
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthorId(book.authorId);
    setCategoryId(book.categoryId);
    setPublishedYear(book.publishedYear || '');
    setIsbn(book.isbn || '');
    setDescription(book.description || '');
    setEditingId(book.id);
  };

  const handleDelete = (id) => {
    const book = books.find(b => b.id === id);
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (bookToDelete) {
      try {
        await fetch(`${API_URL}/${bookToDelete.id}`, { method: 'DELETE' });
        fetchBooks();
        setShowDeleteModal(false);
        setBookToDelete(null);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const handleCancel = () => {
    setTitle('');
    setAuthorId('');
    setCategoryId('');
    setPublishedYear('');
    setIsbn('');
    setDescription('');
    setEditingId(null);
  };

  return (
    <div style={styles.container}>
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${bookToDelete?.title}"? This action cannot be undone.`}
      />

      <h2 style={styles.heading}>Books</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <select 
          value={authorId} 
          onChange={(e) => setAuthorId(e.target.value)}
          style={styles.select}
          required
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select 
          value={categoryId} 
          onChange={(e) => setCategoryId(e.target.value)}
          style={styles.select}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={styles.textarea}
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
        {books.length === 0 ? (
          <p style={styles.emptyState}>No books yet.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} style={styles.item}>
              <div style={styles.itemContent}>
                <strong style={styles.itemTitle}>{book.title}</strong>
                <p style={styles.itemText}>Author: {book.author?.name || 'Unknown'}</p>
                <p style={styles.itemText}>Category: {book.category?.name || 'Unknown'}</p>
                <p style={styles.itemText}>Year: {book.publishedYear}</p>
                <p style={styles.itemText}>ISBN: {book.isbn}</p>
                <p style={styles.itemText}>Description: {book.description}</p>
              </div>
              <div style={styles.itemButtons}>
                <button onClick={() => handleEdit(book)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDelete(book.id)} style={styles.deleteButton}>
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

export default Books;
