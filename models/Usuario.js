const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    idioma: {
        type: String,
        default: 'pt',
    },
    pais: {
        type: String,
    },
    cidade: {
        type: String,
    },
    data_nascimento: {
        type: Date,
    },
    genero: {
        type: String,
        enum: ['masculino', 'feminino', 'não especificado', 'outro'],
        default: 'não especificado',
    },
    avatar_url: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Permite que seja opcional sem gerar erro de índice
    },
    preferencias_turisticas: {
        type: [String],
        default: [],
    },
});

// Hash da senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
    if (this.isModified('senha') && this.senha) {
        this.senha = await bcrypt.hash(this.senha, 8);
    }
    next();
});

// Comparar senhas
UsuarioSchema.methods.compareSenha = function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha);
};

// Gerar token JWT
UsuarioSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

module.exports = mongoose.model('Usuario', UsuarioSchema);