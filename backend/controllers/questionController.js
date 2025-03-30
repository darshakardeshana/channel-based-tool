const Question = require('../models/Question');

module.exports = {
  // Create a new question
  async createQuestion(req, res) {
    try {
      // Retrieve channelId, content, and screenshot from the request body
      const { channelId, content, screenshot } = req.body;
      // Use the authenticated user's ID from req.user (set by auth middleware)
      const userId = req.user.id;
      // Create the question in the database
      const question = await Question.create({ channelId, userId, content, screenshot });
      res.status(201).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve all questions
  async getQuestions(req, res) {
    try {
      const questions = await Question.findAll();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Retrieve a single question by ID
  async getQuestionById(req, res) {
    try {
      const { id } = req.params;
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a question
  async updateQuestion(req, res) {
    try {
      const { id } = req.params;
      const { content, screenshot } = req.body;
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      // Ensure the authenticated user is the owner of the question
      if (question.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to update this question' });
      }
      question.content = content || question.content;
      question.screenshot = screenshot || question.screenshot;
      await question.save();
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a question
  async deleteQuestion(req, res) {
    try {
      const { id } = req.params;
      const question = await Question.findByPk(id);
      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }
      // Ensure the authenticated user is the owner of the question
      if (question.userId !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to delete this question' });
      }
      await question.destroy();
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getQuestionsByChannel(req, res, next) {
    try {
      // The channelId is provided as a route parameter
      const { channelId } = req.params;
      const questions = await Question.findAll({ where: { channelId } });
      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  },
};
