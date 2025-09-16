const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import the Sequelize instance

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  }
});

module.exports = { Blog };