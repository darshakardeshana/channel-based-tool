import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          {question.title ? question.title : question.content.slice(0, 50) + '...'}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {question.author && question.author.displayName} • {new Date(question.createdAt).toLocaleString()}
        </Card.Subtitle>
        <Card.Text>
          {question.content.slice(0, 100)}...
        </Card.Text>
        <Button variant="outline-primary" as={Link} to={`/questions/${question.id}`}>
          View Question
        </Button>
        {onDelete && (
          <Button variant="danger" size="sm" onClick={onDelete} style={{ marginLeft: '10px' }}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      displayName: PropTypes.string,
    }),
  }).isRequired,
};

export default QuestionCard;
