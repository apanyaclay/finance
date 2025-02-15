require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/dbConfig')

app.use(express.json());

// Koneksi ke database
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

app.use('/api' ,require('./routes'));

module.exports = app;