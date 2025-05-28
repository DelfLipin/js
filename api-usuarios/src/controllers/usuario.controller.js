// Arquivo: src/controllers/usuario.controller.js
const knex = require('../database/connection');

module.exports = {
  // Listar todos os usuários
  async listarTodos(req, res) {
    try {
      const usuarios = await knex('usuario').select('*');
      return res.json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Buscar usuário por ID
  async buscarPorId(req, res) {
    const { id } = req.params;
    
    try {
      const usuario = await knex('usuario').where({ id }).first();
      
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.json(usuario);
    } catch (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Criar novo usuário
  async criar(req, res) {
    const { nome, data_nascimento, telefone, email } = req.body;
    
    try {
      // Validação básica
      if (!nome || !data_nascimento || !email) {
        return res.status(400).json({ 
          message: 'Dados inválidos. Nome, data de nascimento e email são obrigatórios' 
        });
      }
      
      // Verifica se o email já está em uso
      const emailExistente = await knex('usuario').where({ email }).first();
      if (emailExistente) {
        return res.status(409).json({ message: 'Este email já está em uso' });
      }
      
      // Insere o novo usuário
      const [id] = await knex('usuario').insert({
        nome,
        data_nascimento,
        telefone,
        email
      });
      
      // Retorna o usuário criado com status 201 (Created)
      return res.status(201).json({ 
        id, 
        nome, 
        data_nascimento, 
        telefone, 
        email,
        message: 'Usuário criado com sucesso'
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Atualizar usuário existente
  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, data_nascimento, telefone, email } = req.body;
    
    try {
      // Verifica se o usuário existe
      const usuarioExiste = await knex('usuario').where({ id }).first();
      
      if (!usuarioExiste) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Validação básica
      if (!nome || !data_nascimento || !email) {
        return res.status(400).json({ 
          message: 'Dados inválidos. Nome, data de nascimento e email são obrigatórios' 
        });
      }
      
      // Verifica se o novo email já está em uso por outro usuário
      if (email !== usuarioExiste.email) {
        const emailExistente = await knex('usuario')
          .where({ email })
          .whereNot({ id })
          .first();
          
        if (emailExistente) {
          return res.status(409).json({ message: 'Este email já está em uso por outro usuário' });
        }
      }
      
      // Atualiza o usuário
      await knex('usuario').where({ id }).update({
        nome,
        data_nascimento,
        telefone,
        email,
        updated_at: knex.fn.now() // Atualiza o timestamp
      });
      
      // Retorna o usuário atualizado
      return res.json({ 
        id: Number(id), 
        nome, 
        data_nascimento, 
        telefone, 
        email,
        message: 'Usuário atualizado com sucesso'
      });
    } catch (error) {
      console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Excluir usuário
  async excluir(req, res) {
    const { id } = req.params;
    
    try {
      // Verifica se o usuário existe
      const usuarioExiste = await knex('usuario').where({ id }).first();
      
      if (!usuarioExiste) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      // Exclui o usuário
      await knex('usuario').where({ id }).delete();
      
      // Retorna status 204 (No Content)
      return res.status(204).send();
    } catch (error) {
      console.error(`Erro ao excluir usuário com ID ${id}:`, error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};
