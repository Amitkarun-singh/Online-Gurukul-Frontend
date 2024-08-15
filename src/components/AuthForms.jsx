import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';

axios.defaults.withCredentials = true;

const AuthForms = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    username: '',
    role: 'student',
  });

  const [avatar, setAvatar] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', loginData);
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in registerData) {
      formData.append(key, registerData[key]);
    }
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Authenticate to Access Online Gurukul</h1>
      <div className="forms">
        <div className={`form-wrapper ${isLoginActive ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-login" onClick={() => setIsLoginActive(true)}>
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLoginSubmit}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" name="email" required onChange={handleLoginChange} />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="password" required onChange={handleLoginChange} />
              </div>
              <div className="input-block">
                <label htmlFor="login-role">Role</label>
                <select id="login-role" name="role" onChange={handleLoginChange} required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </fieldset>
            <button type="submit" className="btn-login">Login</button>
          </form>
        </div>
        <div className={`form-wrapper ${!isLoginActive ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-signup" onClick={() => setIsLoginActive(false)}>
            Register
            <span className="underline"></span>
          </button>
          <form className="form form-signup" onSubmit={handleRegisterSubmit}>
            <fieldset>
              <legend>Please, enter your details to register.</legend>
              <div className="input-block">
                <label htmlFor="signup-name">Name</label>
                <input id="signup-name" type="text" name="name" required onChange={handleRegisterChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" name="email" required onChange={handleRegisterChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" name="password" required onChange={handleRegisterChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-dob">Date of Birth</label>
                <input id="signup-dob" type="date" name="dob" required onChange={handleRegisterChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-username">Username</label>
                <input id="signup-username" type="text" name="username" required onChange={handleRegisterChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-role">Role</label>
                <select id="signup-role" name="role" onChange={handleRegisterChange} required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="input-block">
                <label htmlFor="signup-photo">Profile Photo</label>
                <input id="signup-photo" type="file" name="photo" onChange={handleFileChange} required />
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">Register</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthForms;