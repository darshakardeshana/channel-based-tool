import api from './api';

const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users/admin/users');
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await api.delete(`/users/admin/users/${userId}`);
    return response.data;
  },
};

export default userService;
