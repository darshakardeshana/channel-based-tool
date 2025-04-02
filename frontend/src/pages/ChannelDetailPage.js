import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import questionService from '../services/questionService';
import CreateQuestionModal from '../components/CreateQuestionModal';
import QuestionCard from '../components/QuestionCard';
import { AuthContext } from '../context/AuthContext';

const ChannelDetailPage = () => {
  const { channelId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await questionService.getQuestionsByChannel(channelId);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [channelId]);

  const handleCreateQuestion = async (questionData) => {
    try {
      const formData = new FormData();
      formData.append('content', questionData.content);
      if (questionData.screenshot) {
        formData.append('screenshot', questionData.screenshot);
      }
      formData.append('userId', user.id); // Add userId to formData
      formData.append('channelId', channelId); // Add channelId to formData
      
      await questionService.createQuestion(formData);
      const updatedQuestions = await questionService.getQuestionsByChannel(channelId);

      setQuestions(updatedQuestions);
      setShowQuestionModal(false);
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await questionService.deleteQuestion(questionId);
      const updatedQuestions = await questionService.getQuestionsByChannel(channelId);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Channel Details</Card.Title>
          <Card.Text>Channel ID: {channelId}</Card.Text>
        </Card.Body>
      </Card>
      <Button variant="primary" onClick={() => setShowQuestionModal(true)} className="mb-3">Post a Question</Button>
      <Row>
        {questions.map((question) => (
          <Col key={question.id} md={6} className="mb-3">
            <QuestionCard
              question={question}
              onDelete={question.userId === user?.id ? () => handleDeleteQuestion(question.id) : undefined}
            />
          </Col>
        ))}
      </Row>
      <CreateQuestionModal show={showQuestionModal} handleClose={() => setShowQuestionModal(false)} handleCreate={handleCreateQuestion} />
    </Container>
  );
};

export default ChannelDetailPage;