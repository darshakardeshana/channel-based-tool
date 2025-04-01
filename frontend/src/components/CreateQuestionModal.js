// components/CreateQuestionModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateQuestionModal = ({ show, handleClose, handleCreate }) => {
  const [questionData, setQuestionData] = useState({
    content: '',
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File Selected:", file); // Debugging
    setQuestionData((prev) => ({ ...prev, screenshot: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(questionData);
    setQuestionData({ content: '', screenshot: null });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Post a New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="questionContent" className="mb-3">
            <Form.Label>Question Content</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Enter your question" name="content" value={questionData.content} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="questionScreenshot" className="mb-3">
            <Form.Label>Upload Screenshot (optional)</Form.Label>
            <Form.Control type="file" name="screenshot" onChange={handleFileChange} accept="image/*" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">Post Question</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CreateQuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default CreateQuestionModal;