const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'pontos-turisticos', // pasta onde vai armazenar
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

const upload = multer({ storage });

router.post('/', upload.single('imagem'), (req, res) => {
  res.json({ imagem_url: req.file.path });
});

module.exports = router;