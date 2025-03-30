import api from './api';

const reactionService = {
  addOrUpdateReaction: async (reactionData) => {
    const response = await api.post('/reactions', reactionData);
    return response.data;
  },
  deleteReaction: async (reactionId) => {
    const response = await api.delete(`/reactions/${reactionId}`);
    return response.data;
  },
};

export default reactionService;
