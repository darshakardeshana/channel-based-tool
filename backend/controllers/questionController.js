const Question = require('../models/Question');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: '../frontend/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = {
  // Create a new question (with file upload)
  async createQuestion(req, res) {
    upload.single('screenshot')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const { content, userId, channelId } = req.body; 
        const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

        const question = await Question.create({ channelId, userId, content, screenshot });
        res.status(201).json(question);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
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