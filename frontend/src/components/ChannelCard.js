import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChannelCard = ({ channel }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{channel.name}</Card.Title>
        <Card.Text>{channel.description}</Card.Text>
        <Button variant="outline-primary" as={Link} to={`/channels/${channel.id}`}>
          View Channel
        </Button>
      </Card.Body>
    </Card>
  );
};

ChannelCard.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default ChannelCard;
