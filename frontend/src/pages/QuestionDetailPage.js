import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import questionService from '../services/questionService';
import replyService from '../services/replyService';
import ReplyComponent from '../components/ReplyComponent';
import CreateReplyModal from '../components/CreateReplyModal';

const QuestionDetailPage = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [nestedReplies, setNestedReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);

  useEffect(() => {
    async function fetchQuestionDetails() {
      try {
        const questionData = await questionService.getQuestionById(questionId);
        setQuestion(questionData);
        const repliesData = await replyService.getNestedRepliesByQuestion(questionId);
        setNestedReplies(repliesData);
      } catch (error) {
        console.error('Error fetching question details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestionDetails();
  }, [questionId]);

  const handleReplyCreate = async (replyData) => {
    try {
      // Create the reply via API call
      const newReply = await replyService.createReply(replyData);
      // Re-fetch nested replies (or you could optimistically update state)
      const updatedReplies = await replyService.getNestedRepliesByQuestion(questionId);
      setNestedReplies(updatedReplies);
      setShowReplyModal(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <p>Loading question details...</p>
      </Container>
    );
  }

  if (!question) {
    return (
      <Container className="my-5">
        <p>Question not found.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{question.title || question.content.slice(0, 50) + '...'}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {question.author && question.author.displayName} • {new Date(question.createdAt).toLocaleString()}
          </Card.Subtitle>
          <Card.Text>{question.content}</Card.Text>
        </Card.Body>
      </Card>
      <Button variant="primary" onClick={() => setShowReplyModal(true)} className="mb-4">
        Post a Reply
      </Button>
      <h3>Replies</h3>
      {nestedReplies.length ? (
        <Row>
          {nestedReplies.map((reply) => (
            <Col key={reply.id} xs={12}>
              <ReplyComponent reply={reply} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No replies yet.</p>
      )}
      <CreateReplyModal
        show={showReplyModal}
        handleClose={() => setShowReplyModal(false)}
        handleCreate={handleReplyCreate}
        questionId={question.id}
      />
    </Container>
  );
};

export default QuestionDetailPage;
