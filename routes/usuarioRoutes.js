const express = require('express');
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarPreferencias,
  verificarUsuarioDisponivel
} = require('../controllers/UsuarioController');

// Cadastro
router.post('/', cadastrarUsuario);

// Login
router.post('/login', loginUsuario);

// Atualização de preferências
router.put('/:id/preferencias', atualizarPreferencias);

// Verificação de disponibilidade  de nome de usuário em tempo real
router.get('/disponivel', verificarUsuarioDisponivel);

module.exports = router;