import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";
<Button onClick={handleSubmit}>Register</Button>

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Basic validation
    if (!username || !email || !password) {
      return setError('All fields are required!');
    }
    if (!validateEmail(email)) {
      return setError('Enter a valid email address!');
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response.data || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-5 border rounded">
      <h2 className="text-xl mb-4">Register</h2>
      <input name="username" type="text" placeholder="Username" onChange={handleChange} className="input" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn-primary mt-4">Register</button>
    </form>
  );
};

export default Register;
