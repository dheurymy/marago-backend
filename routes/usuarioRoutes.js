const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarPreferencias
} = require('../controllers/UsuarioController');

// Cadastro
router.post('/', cadastrarUsuario);

// Login
router.post('/login', loginUsuario);

// Atualização de preferências
router.put('/:id/preferencias', atualizarPreferencias);

module.exports = router;