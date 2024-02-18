// PostingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post`);
        setPosts(response.data);
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
      <ul>
        {posts.map((post) => (
          <li key={post.post_id}>
            <img src={post.image} alt={post.description} />
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
