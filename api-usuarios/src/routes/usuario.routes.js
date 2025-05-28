// Arquivo: src/routes/usuario.routes.js
const express = require('express');
const UsuarioController = require('../controllers/usuario.controller');

const router = express.Router();

// Rotas para o recurso "usuário"
router.get('/', UsuarioController.listarTodos);
router.get('/:id', UsuarioController.buscarPorId);
router.post('/', UsuarioController.criar);
router.put('/:id', UsuarioController.atualizar);
router.delete('/:id', UsuarioController.excluir);

module.exports = router;
