const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10; // Adjust as needed

module.exports = {
  // User Registration
  async register(req, res) {
    console.log('req.body in register function', req.body);
    try {
      const { username, password, displayName } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        username,
        password: hashedPassword,
        displayName,
      });

      const userDto = {username: user.username, displayName: user.displayName}

      return res.status(201).json({ message: 'User registered successfully', userDto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // User Login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Generate JWT token
      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      const userDto = {id: user.id, username: user.username, displayName: user.displayName}

      return res.status(200).json({ message: 'Login successful', token, userDto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async getCurrentUser(req, res) {
    try {
      // Assuming you have middleware that adds user data to req.user after JWT verification
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userDto = { id: user.id, username: user.username, displayName: user.displayName };

      return res.status(200).json(userDto);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
