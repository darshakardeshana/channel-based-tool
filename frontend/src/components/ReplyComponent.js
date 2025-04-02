import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const ReplyComponent = ({ reply, level = 0, onReply, onDelete, user }) => {
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
          {onReply && (
            <Button variant="outline-primary" size="sm" onClick={() => onReply(reply.id)}>
              Reply
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" size="sm" onClick={() => onDelete(reply.id)} style={{ marginLeft: '10px' }}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
      {reply.childReplies && reply.childReplies.length > 0 && (
        <div>
          {reply.childReplies.map((childReply) => (
            <ReplyComponent key={childReply.id} reply={childReply} level={level + 1} onReply={onReply} onDelete={childReply.userId === user?.id ? onDelete : undefined} user={user} />
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
  onReply: PropTypes.func,
};

export default ReplyComponent;