const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class Users extends Model { }

Users.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
            
		},
		profile_pic: {
			type: DataTypes.STRING,
			allowNull: true,
			
            
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                isEmail: true
            }
		},
        password: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                len: [6, 222]
            }
		},
		
	},
	{
		hooks: {
		  beforeCreate: async (newUserData) => {
			newUserData.password = await bcrypt.hash(newUserData.password, 10);
			return newUserData;
		  },
		  beforeUpdate: async (updatedUserData) => {
			updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
			return updatedUserData;
		  },
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'users',
	  }
);

module.exports = Users;
