const express = require('express');
const sequelize = require('sequelize');
const mysql = require('mysql2');
const todoRoutes = require ('./Routes/todoRoutes');
require('dotenv').config();
const app = express();
const port = 3000; 


app.use(express.json());
app.use(todoRoutes);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database successfully!');
  });

 
  
  app.listen(port, () => {
    console.log(`Todo backend server is running on http://localhost:${port}`);
  });