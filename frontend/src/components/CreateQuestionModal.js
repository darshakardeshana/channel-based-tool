// src/components/CreateQuestionModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateQuestionModal = ({ show, handleClose, handleCreate }) => {
  const [questionData, setQuestionData] = useState({
    channelId: '',
    content: '',
    screenshot: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(questionData);
    setQuestionData({ channelId: '', content: '', screenshot: '' });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Post a New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="questionChannelId" className="mb-3">
            <Form.Label>Channel ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter channel ID"
              name="channelId"
              value={questionData.channelId}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="questionContent" className="mb-3">
            <Form.Label>Question Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your question"
              name="content"
              value={questionData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="questionScreenshot" className="mb-3">
            <Form.Label>Screenshot URL (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter screenshot URL"
              name="screenshot"
              value={questionData.screenshot}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Post Question
          </Button>
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
