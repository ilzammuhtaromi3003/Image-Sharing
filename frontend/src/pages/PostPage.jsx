// src\pages\PostPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/PostPage.css';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userIdFromLocalStorage = localStorage.getItem('userId');

    if (token && userIdFromLocalStorage) {
      setUserId(userIdFromLocalStorage);
      const fetchPosts = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/post', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPosts(response.data.allPosts);
        } catch (error) {
          setError(error.response.data.message || 'Something went wrong.');
        }
      };
      fetchPosts();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Navbar userId={userId} />
      <div className="container">
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          {posts.map((post) => (
            <div key={post.post_id} className="col-md-4 mb-3 border">
              <div className="card">
                <img
                  src={`http://localhost:3000/images/${post.image}`}
                  alt={post.description}
                  className="card-img-top custom-img"
                />
                <div className="card-body">
                  <p className="card-text">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
