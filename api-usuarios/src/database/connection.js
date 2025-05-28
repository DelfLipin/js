// Arquivo: src/database/connection.js
const knex = require('knex');
const config = require('../../knexfile');

// Determina qual configuração usar com base no ambiente
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

// Exporta a conexão configurada
module.exports = knex(connectionConfig);
