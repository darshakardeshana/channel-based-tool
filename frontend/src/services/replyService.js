import api from './api';

const replyService = {
  createReply: async (replyData) => {
    const response = await api.post('/replies', replyData);
    return response.data;
  },
  getReplyById: async (replyId) => {
    const response = await api.get(`/replies/${replyId}`);
    return response.data;
  },
  updateReply: async (replyId, replyData) => {
    const response = await api.put(`/replies/${replyId}`, replyData);
    return response.data;
  },
  deleteReply: async (replyId) => {
    const response = await api.delete(`/replies/${replyId}`);
    return response.data;
  },
  getNestedRepliesByQuestion: async (questionId) => {
    const response = await api.get(`/replies/nested?questionId=${questionId}`);
    return response.data;
  },
};

export default replyService;
