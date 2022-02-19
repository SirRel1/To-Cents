const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pick extends Model {}

Pick.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    take_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'takes',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pick',
  }
);

module.exports = Pick;
