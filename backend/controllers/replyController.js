const Reply = require('../models/Reply');

module.exports = {
  // Create a new reply
  async createReply(req, res) {
    try {
      const { questionId, parentReplyId, content } = req.body;
      const userId = req.user.id;
      
      // Create the reply; parentReplyId is optional (for nested replies)
      const reply = await Reply.create({ questionId, parentReplyId, userId, content });
      res.status(201).json(reply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve a reply by its ID
  async getReplyById(req, res) {
    try {
      const { id } = req.params;
      const reply = await Reply.findByPk(id);
      if (!reply) {
        return res.status(404).json({ error: 'Reply not found' });
      }
      res.status(200).json(reply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a reply (only if the authenticated user is the owner)
  async updateReply(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const reply = await Reply.findByPk(id);
      if (!reply) {
        return res.status(404).json({ error: 'Reply not found' });
      }
      if (reply.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to update this reply' });
      }
      reply.content = content || reply.content;
      await reply.save();
      res.status(200).json(reply);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a reply (only if the authenticated user is the owner)
  async deleteReply(req, res) {
    try {
      const { id } = req.params;
      const reply = await Reply.findByPk(id);
      if (!reply) {
        return res.status(404).json({ error: 'Reply not found' });
      }
      if (reply.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to delete this reply' });
      }
      await reply.destroy();
      res.status(200).json({ message: 'Reply deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Optionally: Retrieve all replies for a given question using query parameter 'questionId'
  async getRepliesByQuestion(req, res) {
    try {
      const { questionId } = req.query;
      const replies = await Reply.findAll({ where: { questionId } });
      res.status(200).json(replies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getNestedRepliesByQuestion(req, res) {
    try {
      const { questionId } = req.query;
      if (!questionId) {
        return res.status(400).json({ error: 'questionId query parameter is required' });
      }
      
      // Fetch all replies for the given question
      const replies = await Reply.findAll({
        where: { questionId },
        order: [['createdAt', 'ASC']]
      });

      // Build a map of replies keyed by their id, adding a "childReplies" array to each
      const replyMap = {};
      replies.forEach(reply => {
        replyMap[reply.id] = reply.toJSON();
        replyMap[reply.id].childReplies = [];
      });

      // Build the nested tree
      const nestedReplies = [];
      replies.forEach(reply => {
        const replyData = replyMap[reply.id];
        if (reply.parentReplyId) {
          // If there is a parent, add this reply to the parent's childReplies array
          if (replyMap[reply.parentReplyId]) {
            replyMap[reply.parentReplyId].childReplies.push(replyData);
          }
        } else {
          // No parentReplyId means it's a root reply
          nestedReplies.push(replyData);
        }
      });

      res.status(200).json(nestedReplies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
