const sequelize = require('./config/database');
require('./models');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('All models synchronized successfully.');
        process.exit();
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
        process.exit(1);
    });
