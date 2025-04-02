const Reaction = require('../models/Reaction');
const { Sequelize } = require('sequelize');

module.exports = {
  // Add or update a reaction for a reply
  async addOrUpdateReaction(req, res) {
    try {
      const { replyId, reactionType } = req.body;
      const userId = req.user.id;

      // Map 'upvote' and 'downvote' to the model's ENUM values
      const mappedReactionType = reactionType === 'upvote' ? 'thumbs_up' : 'thumbs_down';

      // Check if a reaction already exists for this user on the given reply
      let reaction = await Reaction.findOne({ where: { replyId, userId } });

      if (reaction) {
        // If the reaction exists, update it if the type is different
        if (reaction.reactionType !== mappedReactionType) {
          reaction.reactionType = mappedReactionType;
          await reaction.save();
        }
        return res.status(200).json(reaction);
      }

      // Otherwise, create a new reaction
      reaction = await Reaction.create({ replyId, userId, reactionType: mappedReactionType });
      res.status(201).json(reaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const reaction = await Reaction.findByPk(id);

      if (!reaction) {
        return res.status(404).json({ error: 'Reaction not found' });
      }

      // Ensure only the owner of the reaction can delete it
      if (reaction.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized to delete this reaction' });
      }

      await reaction.destroy();
      res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserReaction(req, res) {
    try {
      const { replyId } = req.params;
      const userId = req.user.id;
  
      const reaction = await Reaction.findOne({ where: { replyId, userId } });
  
      if (!reaction) {
        return res.status(200).json(null); // No reaction found
      }
  
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getReactionCounts(req, res) {
    try {
      const { replyId } = req.params;

      const counts = await Reaction.findAll({
        attributes: [
          [Sequelize.literal("SUM(CASE WHEN reactionType = 'thumbs_up' THEN 1 ELSE 0 END)"), 'upVotes'],
          [Sequelize.literal("SUM(CASE WHEN reactionType = 'thumbs_down' THEN 1 ELSE 0 END)"), 'downVotes'],
        ],
        where: {
          replyId: replyId,
        },
        raw: true,
      });

      res.status(200).json({
        upVotes: parseInt(counts[0].upVotes) || 0,
        downVotes: parseInt(counts[0].downVotes) || 0,
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};