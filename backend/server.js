require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channels');
const questionRoutes = require('./routes/questions');
const reactionRoutes = require('./routes/reactions');
const replyRoutes = require('./routes/replies');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

app.use(cors());

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error connecting to database:', err));

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/replies', replyRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

