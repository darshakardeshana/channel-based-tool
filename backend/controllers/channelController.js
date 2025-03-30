const Channel = require('../models/Channel');

module.exports = {
  // Create a new channel
  async createChannel(req, res) {
    try {
      const { name, description, userId } = req.body;
      const channel = await Channel.create({ name, description, userId });
      res.status(201).json(channel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a list of all channels
  async getChannels(req, res) {
    try {
      const channels = await Channel.findAll();
      res.status(200).json(channels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get details of a specific channel by its ID
  async getChannelById(req, res) {
    try {
      const { id } = req.params;
      const channel = await Channel.findByPk(id);
      if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
      }
      res.status(200).json(channel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update channel details (e.g., name or description)
  async updateChannel(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const channel = await Channel.findByPk(id);
      if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
      }
      channel.name = name || channel.name;
      channel.description = description || channel.description;
      await channel.save();
      res.status(200).json(channel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Toggle the channel's active status (activate/deactivate)
  async toggleChannelStatus(req, res) {
    try {
      const { id } = req.params;
      const channel = await Channel.findByPk(id);
      if (!channel) {
        return res.status(404).json({ error: 'Channel not found' });
      }
      channel.isActive = !channel.isActive;
      await channel.save();
      res.status(200).json(channel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
