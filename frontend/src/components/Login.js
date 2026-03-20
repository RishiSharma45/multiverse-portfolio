import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAPI from '../services/authApi';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   const response = await API.post('/auth/login', formData);
    const response = await AuthAPI.post('/auth/login', formData);
      localStorage.setItem('adminToken', response.data.token);
      setMessage('Login successful ✅');
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid email or password');
    }
  };

  return (
    <div className="admin-page">
      <h1>🔐 Admin Login</h1>
      <p>Login to access the control panel.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}

export default Login;