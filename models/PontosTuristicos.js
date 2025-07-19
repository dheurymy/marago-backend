const mongoose = require('mongoose');

const PontoTuristicoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    default: '',
  },
  tipo: {
    type: [String], // Ex: ["praias", "diurno"]
    default: [],
  },
  cidade: {
    type: String,
  },
  estado: {
    type: String,
  },
  pais: {
    type: String,
  },
  coordenadas: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  horario_funcionamento: {
    abertura: { type: String }, // ex: "08:00"
    fechamento: { type: String }  // ex: "18:00"
  },
  imagens: {
    type: [String], // URLs das imagens
    default: []
  },
  tags: {
    type: [String], // ex: ["histórico", "natureza"]
    default: []
  },
  popularidade: {
    type: Number,
    default: 0
  },
  ativo: {
    type: Boolean,
    default: true
  },
  criado_em: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PontoTuristico', PontoTuristicoSchema);