import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

const CreateReplyModal = ({ show, handleClose, handleCreate, parentReplyId = null, questionId }) => {
  const [replyData, setReplyData] = useState({
    questionId: questionId || '',
    parentReplyId: parentReplyId,
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate(replyData);
    setReplyData({ questionId: questionId || '', parentReplyId: parentReplyId, content: '' });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{parentReplyId ? 'Reply to Reply' : 'Post a Reply'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Hidden fields for questionId and parentReplyId if needed */}
          <Form.Control type="hidden" name="questionId" value={replyData.questionId} readOnly />
          {parentReplyId && (
            <Form.Control type="hidden" name="parentReplyId" value={replyData.parentReplyId} readOnly />
          )}
          <Form.Group controlId="replyContent" className="mb-3">
            <Form.Label>Reply Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter your reply"
              name="content"
              value={replyData.content}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Post Reply
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

CreateReplyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  parentReplyId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  questionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default CreateReplyModal;
