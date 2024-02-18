// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/login`, {
        email,
        password
      });
      const token = response.data.token;
      console.log('Token:', token);
      // Navigasi ke halaman posts setelah login berhasil
      navigate('/posts');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while logging in');
      }
    }
  };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Login</h2>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example1cg"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4cg"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>

                  {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

                  <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/register" className="fw-bold text-body"><u>Register here</u></Link></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
