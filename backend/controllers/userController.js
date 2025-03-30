const User = require('../models/User');

module.exports = {
  // Get the current user's profile (excluding the password)
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update the current user's profile (e.g., displayName, avatar)
  async updateProfile(req, res) {
    try {
      const { displayName, avatar } = req.body;
      const user = await User.findByPk(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.displayName = displayName || user.displayName;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ADMIN: Retrieve a list of all users (excluding passwords)
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ADMIN: Delete a user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
