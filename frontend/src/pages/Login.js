import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{marginLeft:'35%',boxShadow:'0 10px 10px 10px rgba(0, 0, 0, 0.1)', width:'35%',borderRadius:'10px',height:'270px'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{marginTop:'25px', maxWidth: 500 ,marginBottom:'10px'}}>
        {/* <div className="mb-3"> */}
        <div className="form-floating mb-3">
          {/* <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
         */}
          <input
    type="email"
    className="form-control"
    id="floatingEmail"
    placeholder="Email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    required
  />
  <label htmlFor="floatingEmail">Email</label>
</div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login; 