const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reaction = sequelize.define('Reaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reactionType: {
    type: DataTypes.ENUM('thumbs_up', 'thumbs_down'),
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  replyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'reactions',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'replyId']
    }
  ]
});

module.exports = Reaction;
