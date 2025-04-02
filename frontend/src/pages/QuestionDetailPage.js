import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import questionService from '../services/questionService';
import replyService from '../services/replyService';
import ReplyComponent from '../components/ReplyComponent';
import CreateReplyModal from '../components/CreateReplyModal';
import { AuthContext } from '../context/AuthContext';

const QuestionDetailPage = () => {
  const { user } = useContext(AuthContext);
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [nestedReplies, setNestedReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedParentReplyId, setSelectedParentReplyId] = useState(null);

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
      const replyWithUserId = { ...replyData, userId: user.id, parentReplyId: selectedParentReplyId };
      await replyService.createReply(replyWithUserId);
      const updatedReplies = await replyService.getNestedRepliesByQuestion(questionId);
      setNestedReplies(updatedReplies);
      setShowReplyModal(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleDeleteReply = async (replyId) => {
    try {
      await replyService.deleteReply(replyId);
      const updatedReplies = await replyService.getNestedRepliesByQuestion(questionId);
      setNestedReplies(updatedReplies);
    } catch (error) {
      console.error('Error deleting reply:', error);
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
          {question.screenshot && (
            <img
              src="../uploads/screenshot-1743610823704.png"
              alt="Question Screenshot"
              fluid
              className="mb-3"
            />
          )}
          <Card.Text>{question.content}</Card.Text>
        </Card.Body>
      </Card>
      <div className="mb-3">
        <Button
          variant="primary"
          onClick={() => {
            setSelectedParentReplyId(null);
            setShowReplyModal(true);
          }}
        >
          Post a Reply
        </Button>
      </div>
      <h3>Replies</h3>
      {nestedReplies.length ? (
        <Row>
          {nestedReplies.map((reply) => (
            <Col key={reply.id} xs={12}>
              <ReplyComponent
                reply={reply}
                onReply={(parentId) => {
                  setSelectedParentReplyId(parentId);
                  setShowReplyModal(true);
                }}
                onDelete={reply.userId === user?.id ? handleDeleteReply : undefined}
                user={user}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No replies yet.</p>
      )}
      <CreateReplyModal
        show={showReplyModal}
        handleClose={() => {
          setShowReplyModal(false);
          setSelectedParentReplyId(null);
        }}
        handleCreate={handleReplyCreate}
        questionId={question.id}
        parentReplyId={selectedParentReplyId}
      />
    </Container>
  );
};

export default QuestionDetailPage;