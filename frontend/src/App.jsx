// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to My App</h1>
        <Routes>
          <Route path="/" element={<LoginPage />} /> {/* Rute default untuk root path */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<PostPage />} />
          {/* Tambahkan rute lainnya di sini sesuai kebutuhan */}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
