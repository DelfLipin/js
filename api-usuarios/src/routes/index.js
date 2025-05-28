// Arquivo: src/routes/index.js
const express = require('express');
const usuarioRoutes = require('./usuario.routes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);

module.exports = router;
