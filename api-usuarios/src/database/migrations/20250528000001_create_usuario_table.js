// Arquivo: src/database/migrations/20250528000001_create_usuario_table.js
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function(table) {
    table.increments('id').primary();
    table.string('nome', 120).notNullable();
    table.date('data_nascimento').notNullable();
    table.string('telefone', 15);
    table.string('email', 120).unique();
    table.timestamps(true, true); // Adiciona colunas created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuario');
};
