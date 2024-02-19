import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Modal, Form } from 'react-bootstrap';

const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError('Gagal mengambil profil pengguna');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/category/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError('Gagal mengambil kategori');
      }
    };

    fetchUserProfile();
    fetchCategories();
  }, [id, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);
    formData.append('category_id', category); // Mengirim ID kategori ke backend

    try {
      await axios.post('http://localhost:3000/api/post/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh halaman setelah mengunggah
      window.location.reload();
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Gagal mengunggah gambar');
    }
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
            <Button variant="primary" onClick={handleModalShow} className="mt-3">
              Upload Post
            </Button>
          </Col>
        </Row>
      )}
      <Link to="/posts" className="btn btn-primary mt-3 mr-3">Go to Posts</Link>
      <Button variant="danger" onClick={handleLogout} className="mt-3">Logout</Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={description} onChange={handleDescriptionChange} />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={category} onChange={handleCategoryChange}>
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfilePage;
