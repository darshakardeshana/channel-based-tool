import React from 'react';
import { Container } from 'react-bootstrap';

function DashboardPage() {
  return (
    <Container className="my-5">
      <h2>Dashboard</h2>
      <p>Welcome to the Dashboard! This is a protected page.</p>
    </Container>
  );
}

export default DashboardPage;
