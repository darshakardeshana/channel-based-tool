import api from './api';

const questionService = {
  getQuestions: async () => {
    const response = await api.get('/questions');
    return response.data;
  },
  getQuestionById: async (questionId) => {
    const response = await api.get(`/questions/${questionId}`);
    return response.data;
  },
  createQuestion: async (questionData) => {
    const response = await api.post('/questions', questionData);
    return response.data;
  },
  updateQuestion: async (questionId, questionData) => {
    const response = await api.put(`/questions/${questionId}`, questionData);
    return response.data;
  },
  deleteQuestion: async (questionId) => {
    const response = await api.delete(`/questions/${questionId}`);
    return response.data;
  },
  getQuestionsByChannel: async (channelId) => {
    const response = await api.get(`/questions/channel/${channelId}`);
    return response.data;
  },
};

export default questionService;
