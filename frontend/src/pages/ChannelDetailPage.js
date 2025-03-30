// src/pages/ChannelDetailPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import channelService from '../services/channelService';
import questionService from '../services/questionService';
import QuestionCard from '../components/QuestionCard';

const ChannelDetailPage = () => {
  const { channelId } = useParams(); // Gets the channel ID from the URL
  const [channel, setChannel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch channel details
        const channelData = await channelService.getChannelById(channelId);
        setChannel(channelData);
        
        // Fetch questions for this channel
        const channelQuestions = await questionService.getQuestionsByChannel(channelId);
        setQuestions(channelQuestions);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [channelId]);

  if (loading) {
    return (
      <Container className="my-5">
        <p>Loading channel details...</p>
      </Container>
    );
  }

  if (!channel) {
    return (
      <Container className="my-5">
        <p>Channel not found.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{channel.name}</Card.Title>
          <Card.Text>{channel.description}</Card.Text>
        </Card.Body>
      </Card>
      <h3>Questions in this channel</h3>
      <Row>
        {questions.length ? (
          questions.map((question) => (
            <Col key={question.id} md={6} className="mb-3">
              <QuestionCard question={question} />
            </Col>
          ))
        ) : (
          <p>No questions have been posted in this channel yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default ChannelDetailPage;
