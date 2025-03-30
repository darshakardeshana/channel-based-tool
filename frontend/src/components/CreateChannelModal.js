import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateChannelModal = ({ show, handleClose, handleCreate }) => {
  const [channelData, setChannelData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChannelData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass channelData to the parent handler to process creation (e.g., API call)
    handleCreate(channelData);
    // Optionally reset form here if needed
    setChannelData({ name: '', description: '' });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="channelName" className="mb-3">
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter channel name"
              name="name"
              value={channelData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="channelDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter channel description"
              name="description"
              value={channelData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Channel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CreateChannelModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default CreateChannelModal;
