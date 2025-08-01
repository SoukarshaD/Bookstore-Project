import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import '../index.css';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user);
      alert('Login successful!');
      navigate('/bookstore');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

return (
  <form onSubmit={handleSubmit} className="auth-form">
    <h2>Login</h2>
    <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
    <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
    <button type="submit">Login</button>
    <p style={{ marginTop: '10px' }}>
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </form>
);

};

export default Login;
