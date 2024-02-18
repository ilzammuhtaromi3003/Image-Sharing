import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostPage.css'; // Import file CSS untuk styling

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/post`);
        setPosts(response.data.allPosts); // Sesuaikan dengan struktur data yang diterima dari server
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    // Lakukan proses logout di sini, seperti menghapus token dari local storage atau state aplikasi
    // Contoh penghapusan token dari local storage:
    localStorage.removeItem('token');
    // Redirect ke halaman login setelah logout berhasil
    navigate('/login');
  };

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post.post_id} className="post-card">
            <div className="post-image-container">
              <img 
                src={`http://localhost:3000/images/${post.image}`}  
                alt={post.description} 
                className="post-image" />
            </div>
            <div className="post-description-container">
              <p className="post-description">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
