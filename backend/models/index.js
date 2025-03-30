const User = require('./User');
const Channel = require('./Channel');
const Question = require('./Question');
const Reply = require('./Reply');
const Reaction = require('./Reaction');

User.hasMany(Channel, { foreignKey: 'createdBy', as: 'channels' });
Channel.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(Question, { foreignKey: 'userId', as: 'questions' });
Question.belongsTo(User, { foreignKey: 'userId', as: 'author' });

Channel.hasMany(Question, { foreignKey: 'channelId', as: 'questions' });
Question.belongsTo(Channel, { foreignKey: 'channelId', as: 'channel' });

User.hasMany(Reply, { foreignKey: 'userId', as: 'replies' });
Reply.belongsTo(User, { foreignKey: 'userId', as: 'author' });

Question.hasMany(Reply, { foreignKey: 'questionId', as: 'replies' });
Reply.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });

Reply.hasMany(Reply, { foreignKey: 'parentReplyId', as: 'childReplies' });
Reply.belongsTo(Reply, { foreignKey: 'parentReplyId', as: 'parentReply' });

User.hasMany(Reaction, { foreignKey: 'userId', as: 'reactions' });
Reaction.belongsTo(User, { foreignKey: 'userId', as: 'reactor' });

Reply.hasMany(Reaction, { foreignKey: 'replyId', as: 'reactions' });
Reaction.belongsTo(Reply, { foreignKey: 'replyId', as: 'reply' });

module.exports = {
  User,
  Channel,
  Question,
  Reply,
  Reaction,
};
