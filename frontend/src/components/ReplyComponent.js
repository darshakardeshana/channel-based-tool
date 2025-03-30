// src/components/ReplyComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const ReplyComponent = ({ reply, level }) => {
  // Calculate left margin based on nesting level
  const marginLeft = level * 20;

  return (
    <div style={{ marginLeft: `${marginLeft}px`, marginBottom: '1rem' }}>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {reply.author && reply.author.displayName} • {new Date(reply.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{reply.content}</Card.Text>
          <div className="mb-2">
            <span>Upvotes: {reply.upVotes}</span>
            <span style={{ marginLeft: '10px' }}>Downvotes: {reply.downVotes}</span>
          </div>
        </Card.Body>
      </Card>
      {reply.childReplies && reply.childReplies.length > 0 && (
        <div>
          {reply.childReplies.map((childReply) => (
            <ReplyComponent key={childReply.id} reply={childReply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

ReplyComponent.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotes: PropTypes.number,
    downVotes: PropTypes.number,
    author: PropTypes.shape({
      displayName: PropTypes.string,
    }),
    childReplies: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  level: PropTypes.number,
};

ReplyComponent.defaultProps = {
  level: 0,
};

export default ReplyComponent;
