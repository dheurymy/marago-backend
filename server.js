const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');

const Usuario = require('./models/Usuario');
require('./config/passport'); // Configuração do Passport com Google

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Configurações de CORS
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Configurações de Sessão para Passport
app.use(session({
    secret: process.env.JWT_SECRET || 'minha_chave_secreta',
    resave: false,
    saveUninitialized: false,
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware 
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'no-cors');
    next();
});

// Conexão com MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Conectado ao MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Erro ao conectar ao MongoDB:', err.message);
    });

// Rota de teste
app.get('/', (req, res) => {
    res.send('🗺️ API do MaraGO funcionando a todo vapor!');
});

// Rotas de autenticação com Google 
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Rotas de upload de imagens
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/upload', uploadRoutes);

// Rotas de usuário
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

// Rotas de pontos de interesse
const pontosRoutes = require('./routes/pontosRoutes');
app.use('/pontos', pontosRoutes);

