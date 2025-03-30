// models/Reply.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reply = sequelize.define('Reply', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parentReplyId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'replies',
  timestamps: true,
});

module.exports = Reply;
