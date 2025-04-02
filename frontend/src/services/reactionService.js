import api from './api';

const reactionService = {
  addOrUpdateReaction: async (reactionData, token) => {
    const response = await api.post('/reactions', reactionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  deleteReaction: async (reactionId, token) => {
    const response = await api.delete(`/reactions/${reactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getUserReaction: async (replyId, token) => {
    const response = await api.get(`/reactions/user/${replyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getReactionCounts: async (replyId) => {
    const response = await api.get(`/reactions/counts/${replyId}`);
    return response.data;
  },
};

export default reactionService;