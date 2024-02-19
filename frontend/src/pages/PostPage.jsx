// src\pages\PostPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    // Pemeriksaan No. 1: Ambil nilai userId dari localStorage
    const token = localStorage.getItem('token');
    const userIdFromLocalStorage = localStorage.getItem('userId');
    
    console.log("UserId from localStorage:", userIdFromLocalStorage); // Logging nilai userId

    // Pemeriksaan No. 2: Set userId ke dalam state komponen
    if (token && userIdFromLocalStorage) {
      console.log("Token and userId are present. Setting userId..."); // Logging pesan untuk menunjukkan bahwa token dan userId ditemukan

      // Pastikan bahwa userId yang diambil dari localStorage sudah dalam format yang diharapkan
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

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId'); 
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h2>Posts</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      {userId && <Link to={`/profile/${userId}`} className="btn btn-primary">Profile</Link>}
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {posts.map((post) => (
          <div key={post.post_id} className="col-md-4 mb-3">
            <div className="card">
              <img 
                src={`http://localhost:3000/images/${post.image}`}  
                alt={post.description} 
                className="card-img-top" />
              <div className="card-body">
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;