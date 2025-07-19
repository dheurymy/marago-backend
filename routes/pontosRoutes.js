const express = require('express');
const router = express.Router();

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const {
  criarPontoComImagem,
  listarPontos,
  buscarPorId,
  atualizarPonto,
  deletarPonto,
  buscarPorFiltro
} = require('../controllers/PontosTuristicosController');

// ☁️ Configuração de armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pontos-turisticos',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

// 🆕 Criar ponto turístico com imagem
router.post('/', upload.single('imagem'), criarPontoComImagem);

// 📋 Listar todos os pontos turísticos ativos
router.get('/', listarPontos);

// 🔍 Buscar por tipo e tags
router.get('/filtro', buscarPorFiltro);

// 🔎 Buscar ponto turístico por ID
router.get('/:id', buscarPorId);

// ✏️ Atualizar ponto turístico por ID
router.put('/:id', atualizarPonto);

// ❌ Deletar ponto turístico por ID
router.delete('/:id', deletarPonto);

module.exports = router;