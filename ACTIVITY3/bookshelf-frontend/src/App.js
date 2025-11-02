import React, { useState } from 'react';
import Authors from './components/Authors';
import Categories from './components/Categories';
import Books from './components/Books';

function App() {
  const [activeTab, setActiveTab] = useState('books');

  const styles = {
    app: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      textAlign: 'center',
      padding: '40px 0',
      borderBottom: '1px solid #000',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#000',
      margin: 0,
    },
    headerSubtitle: {
      fontSize: '14px',
      color: '#666',
      marginTop: '8px',
    },
    tabs: {
      display: 'flex',
      gap: '0',
      margin: '30px 0',
      borderBottom: '2px solid #000',
      justifyContent: 'center',
    },
    tab: {
      padding: '12px 24px',
      background: 'none',
      border: 'none',
      borderBottom: '3px solid transparent',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#666',
      transition: 'all 0.2s',
    },
    tabActive: {
      padding: '12px 24px',
      background: 'none',
      border: 'none',
      borderBottom: '3px solid #000',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#000',
      fontWeight: '600',
      transition: 'all 0.2s',
    },
    content: {
      padding: '30px 0',
    },
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Bookshelf Management System</h1>
        <p style={styles.headerSubtitle}>Manage books, authors, and categories</p>
      </header>

      <nav style={styles.tabs}>
        <button
          style={activeTab === 'books' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button
          style={activeTab === 'authors' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('authors')}
        >
          Authors
        </button>
        <button
          style={activeTab === 'categories' ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </nav>

      <main style={styles.content}>
        {activeTab === 'books' && <Books />}
        {activeTab === 'authors' && <Authors />}
        {activeTab === 'categories' && <Categories />}
      </main>
    </div>
  );
}

export default App;
