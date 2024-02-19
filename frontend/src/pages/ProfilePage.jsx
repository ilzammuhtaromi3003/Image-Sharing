// src\pages\ProfilePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage

    if (!token) {
      // Jika token tidak ada, arahkan pengguna ke halaman login
      navigate('/login');
      return; // Berhenti dan jangan lanjutkan permintaan
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Sertakan token dalam header Authorization
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError('Gagal mengambil profil pengguna');
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <Container>
      <h2>User Profile</h2>
      {error && <p>{error}</p>}
      {user && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img variant="top" src={user.foto || 'placeholder.jpg'} alt={user.full_name} />
              <Card.Body>
                <Card.Title>{user.full_name}</Card.Title>
                <Card.Text>{user.bio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <h3>Posts by {user.full_name}</h3>
            <ListGroup>
              {user.posts.map((post) => (
                <ListGroup.Item key={post.post_id}>
                  <img src={`http://localhost:3000/images/${post.image}`} alt={post.description} style={{ width: '100px', marginRight: '10px' }} />
                  {post.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
      <Link to="/posts" className="btn btn-primary mt-3 mr-3">Go to Posts</Link>
      <Button variant="danger" onClick={handleLogout} className="mt-3">Logout</Button>
    </Container>
  );
};

export default UserProfilePage;
