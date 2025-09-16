const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your database configuration
// The first argument is the database name, followed by username and password (for databases like Postgres or MySQL)
// For SQLite, you just provide the file path.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' // This will create a file named 'database.sqlite'
});

// Test the connection
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connectToDatabase };