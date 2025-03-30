// src/pages/RegisterPage.js
import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    displayName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Pass only required fields to the register function
      const registrationData = {
        displayName: formData.displayName,
        username: formData.username,
        password: formData.password,
      };
      await register(registrationData);
      setMessage('Registration successful. You can now log in.');
      // Optionally, you may redirect to login page here
    } catch (err) {
      console.error('Registration error:', err);
      setError('Error during registration. Please try again.');
    }
  };

  return (
    <Container className="my-5">
      <h2>Register</h2>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="registerDisplayName" className="mb-3">
          <Form.Label>Display Name</Form.Label>
          <Form.Control 
            type="text" 
            name="displayName" 
            value={formData.displayName} 
            onChange={handleChange} 
            placeholder="Enter display name" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="registerUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Enter username" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="registerPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Enter password" 
            required 
          />
        </Form.Group>
        <Form.Group controlId="registerConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm password" 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;