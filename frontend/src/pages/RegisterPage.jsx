import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/register`, {
        full_name: fullName,
        username,
        email,
        password
      });
      console.log(response.data);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section className="vh-100 bg-image" style={{backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  <form>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      <label className="form-label">Your Name</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="text" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
                      <label className="form-label">Username</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label">Your Email</label>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label">Password</label>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" />
                      <label className="form-check-label">I agree all statements in <Link to="#" className="text-body"><u>Terms of service</u></Link></label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleRegister}>Register</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
