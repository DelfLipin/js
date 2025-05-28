// Arquivo: src/database/migrations/20250528000002_seed_usuarios_iniciais.js
exports.up = function(knex) {
  return knex('usuario').insert([
    {
      nome: 'João Silva',
      data_nascimento: '1990-05-15',
      telefone: '(11) 98765-4321',
      email: 'joao.silva@exemplo.com'
    },
    {
      nome: 'Maria Oliveira',
      data_nascimento: '1985-10-22',
      telefone: '(21) 91234-5678',
      email: 'maria.oliveira@exemplo.com'
    },
    {
      nome: 'Carlos Santos',
      data_nascimento: '1995-03-08',
      telefone: '(31) 99876-5432',
      email: 'carlos.santos@exemplo.com'
    }
  ]);
};

exports.down = function(knex) {
  // Remove os usuários inseridos pela função up
  return knex('usuario')
    .whereIn('email', [
      'joao.silva@exemplo.com',
      'maria.oliveira@exemplo.com',
      'carlos.santos@exemplo.com'
    ])
    .delete();
};
