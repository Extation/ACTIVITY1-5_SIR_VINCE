/**
 * Main React application component for the Blog Platform frontend.
 * Sets up routing, authentication context, and renders the navigation and page components.
 * Handles client-side routing for home, login, register, post creation, editing, and details.
 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation onSearch={handleSearch} searchValue={searchQuery} />
          <main className="min-vh-100">
            <Routes>
              <Route path="/" element={<Home searchQuery={searchQuery} onSearchChange={setSearchQuery} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <h5>
                    
                    Dev.inci Blog
                  </h5>
                  <p className="mb-0">
                    A platform to share knowledge and ideas through blogging like Da vinci.
                  </p>
                   <p className="mb-0">
                    © 2025 Dev.inci Blog. All rights reserved.
                  </p>
                </div>
                <div className="col-md-6 text-md-end">
                 
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
