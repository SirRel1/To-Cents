const Users = require('./takeUsers');
const Comment = require('./Comment');
const Takes = require('./Takes');
const Pick = require('./Pick');
const { pick } = require('lodash');

Users.hasMany(Takes, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Takes.belongsTo(Users, {
  // foreignKey: 'user_id'
});
Users.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(Users, {
  // foreignKey: 'user_id'
});

Takes.hasMany(Pick, {
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Pick.belongsTo(Takes, {
  // foreignKey: 'user_id'
});


Takes.hasMany(Comment, {
  // foreignKey: 'take_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Takes, {
  // foreignKey: 'take_id'
});




module.exports = { Users, Takes, Comment, Pick };
