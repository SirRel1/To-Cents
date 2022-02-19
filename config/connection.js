const Sequelize = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(process.env.MYSQL_URL);


let sequelize; 

const URI = process.env.MYSQL_URL || process.env.JAWSDB_URL 

sequelize = new Sequelize(URI)



module.exports = sequelize;