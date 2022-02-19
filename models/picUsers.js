const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class picUsers extends Model { }

picUsers.init(
	{
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
            
        },
    },	
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'picusers',
	}

);

module.exports = picUsers;


