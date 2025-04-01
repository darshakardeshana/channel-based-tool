import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const ChannelCard = ({ channel, onDelete }) => {
  const { user } = useContext(AuthContext); // Get logged-in user from AuthContext

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{channel.name}</Card.Title>
        <Card.Text>{channel.description}</Card.Text>
        <Row>
          <Col>
            <Button variant="outline-primary" as={Link} to={`/channels/${channel.id}`}>
              View Channel
            </Button>
          </Col>
          {onDelete && user && channel.userId === user.id && ( // Conditional rendering of delete button
            <Col className="text-end">
              <Button variant="outline-danger" onClick={() => onDelete(channel.id)}>
                Delete
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    userId: PropTypes.number, // Add userId to propTypes
  }).isRequired,
  onDelete: PropTypes.func,
};

export default ChannelCard;