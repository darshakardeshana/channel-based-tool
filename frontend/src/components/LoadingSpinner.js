// src/components/LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-3">
      <Spinner animation="border" role="status" variant="primary" />
      <span className="mt-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
