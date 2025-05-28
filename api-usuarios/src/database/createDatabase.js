// Arquivo: src/database/createDatabase.js
require('dotenv').config();
const mysql = require('mysql2');

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Cria uma conexão sem especificar o banco de dados
const connection = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD
});

// Tenta criar o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
  if (err) {
    console.error('Erro ao criar o banco de dados:', err);
    process.exit(1);
  }
  
  console.log(`Banco de dados '${DB_NAME}' criado ou já existente.`);
  connection.end();
});
