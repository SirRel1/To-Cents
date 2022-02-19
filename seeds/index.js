const sequelize = require('../config/connection');
const seedTakes = require('./takesData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedTakes();

    process.exit(0);
};

seedAll();