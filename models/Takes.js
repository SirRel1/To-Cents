const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')
const Sequelize = require('sequelize');

class Takes extends Model { }

Takes.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'users',
			  key: 'id',
			},
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Sports"
		  },
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	createdAt: {
		field: 'created_at',
		type: Sequelize.DATE,
	},
	updatedAt: {
		field: 'updated_at',
		type: Sequelize.DATE,
	},
	},
	
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'takes',
	}
);

module.exports = Takes;
