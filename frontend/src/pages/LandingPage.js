// src/pages/LandingPage.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="my-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Welcome to Channel Tool</h1>
        <p className="fs-4">
          Discuss programming issues, share your ideas, and collaborate with others.
        </p>
        <Button variant="primary" as={Link} to="/login">
          Get Started
        </Button>
      </div>
    </Container>
  );
};

export default LandingPage;
