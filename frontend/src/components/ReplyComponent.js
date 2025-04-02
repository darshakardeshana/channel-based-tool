import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import reactionService from '../services/reactionService';
import { AuthContext } from '../context/AuthContext';

const ReplyComponent = ({ reply, level = 0, onReply, onDelete, user }) => {
  const marginLeft = level * 20;
  const { token } = useContext(AuthContext);
  const [upVotes, setUpVotes] = useState(0); // Initialize to 0
  const [downVotes, setDownVotes] = useState(0); // Initialize to 0
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const fetchUserReaction = async () => {
      if (token) {
        try {
          const reaction = await reactionService.getUserReaction(reply.id, token);
          if (reaction) {
            setUserReaction(reaction.reactionType === 'thumbs_up' ? 'upvote' : 'downvote');
          } else {
            setUserReaction(null);
          }
        } catch (error) {
          console.error('Error fetching user reaction:', error);
        }
      } else {
        setUserReaction(null);
      }
    };

    const fetchReactionCounts = async () => {
      try {
        const counts = await reactionService.getReactionCounts(reply.id);
        setUpVotes(counts.upVotes);
        setDownVotes(counts.downVotes);
      } catch (error) {
        console.error('Error fetching reaction counts:', error);
      }
    };

    fetchUserReaction();
    fetchReactionCounts();

  }, [reply.id, token]);

  const handleVote = async (reactionType) => {
    if (!token) {
      alert('You must be logged in to vote.');
      return;
    }

    try {
      await reactionService.addOrUpdateReaction(
        { replyId: reply.id, reactionType: reactionType },
        token
      );

      // Re-fetch reaction counts after a vote
      const counts = await reactionService.getReactionCounts(reply.id);
      setUpVotes(counts.upVotes);
      setDownVotes(counts.downVotes);

      if (reactionType === 'upvote') {
        if (userReaction === 'upvote') {
          setUserReaction(null);
        } else if (userReaction === 'downvote') {
          setUserReaction('upvote');
        } else {
          setUserReaction('upvote');
        }
      } else {
        if (userReaction === 'downvote') {
          setUserReaction(null);
        } else if (userReaction === 'upvote') {
          setUserReaction('downvote');
        } else {
          setUserReaction('downvote');
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <div style={{ marginLeft: `${marginLeft}px`, marginBottom: '1rem' }}>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {reply.author && reply.author.displayName} • {new Date(reply.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{reply.content}</Card.Text>
          <div className="mb-2">
            <span>Up votes: {upVotes}</span>
            <Button
              variant={userReaction === 'upvote' ? 'success' : 'outline-success'}
              size="sm"
              onClick={() => handleVote('upvote')}
              style={{ marginLeft: '5px' }}
            >
              👍
            </Button>
            <span style={{ marginLeft: '10px' }}>Down votes: {downVotes}</span>
            <Button
              variant={userReaction === 'downvote' ? 'danger' : 'outline-danger'}
              size="sm"
              onClick={() => handleVote('downvote')}
              style={{ marginLeft: '5px' }}
            >
              👎
            </Button>
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
            <ReplyComponent
              key={childReply.id}
              reply={childReply}
              level={level + 1}
              onReply={onReply}
              onDelete={childReply.userId === user?.id ? onDelete : undefined}
              user={user}
            />
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
    author: PropTypes.shape({
      displayName: PropTypes.string,
    }),
    childReplies: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  level: PropTypes.number,
  onReply: PropTypes.func,
  onDelete: PropTypes.func,
  user: PropTypes.object,
};

export default ReplyComponent;