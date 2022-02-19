const Takes  = require('../models/Takes.js')

const takesData = [
    {
        title: 'Relationships',
        description: 'Sometimes you get into a situation that is harder than you expected.'
    }
];

const seedTakes = () => Takes.bulkCreate(takesData);


module.exports = seedTakes;