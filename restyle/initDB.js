require('dotenv').config();
const mysql = require('mysql2/promise');
const { createUsersTable } = require('./models/User');

async function initializeDatabase() {
  let connection;
  try {
    // Create database if it doesn't exist
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();

    // Connect to the database and create tables
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10
    });

    await createUsersTable(pool);
    const { createProductsTable } = require('./models/Product');
    await createProductsTable(pool);
    console.log('Database initialization complete');
    process.exit(0);
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  }
}

initializeDatabase();