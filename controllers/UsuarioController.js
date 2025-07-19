const Usuario = require('../models/Usuario');

// 📥 Cadastro de novo usuário
exports.cadastrarUsuario = async (req, res) => {
    try {
        const {
            nome, usuario, email, senha,
            idioma, pais, cidade,
            data_nascimento, genero, avatar_url
        } = req.body;

        // Verifica se email ou nome de usuário já estão em uso
        const emailExiste = await Usuario.findOne({ email });
        const usuarioExiste = await Usuario.findOne({ usuario });

        if (emailExiste) return res.status(400).json({ erro: 'Email já cadastrado' });
        if (usuarioExiste) return res.status(400).json({ erro: 'Nome de usuário já em uso' });

        // Cria novo usuário
        const novoUsuario = new Usuario({
            nome, usuario, email, senha,
            idioma, pais, cidade,
            data_nascimento, genero, avatar_url
        });

        await novoUsuario.save();

        // Gera token JWT
        const token = novoUsuario.generateAuthToken();

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: novoUsuario,
            token
        });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao cadastrar usuário', detalhes: err.message });
    }
};

// 🔑 Login com email e senha
exports.loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario || !usuario.senha) {
            return res.status(400).json({ erro: 'Credenciais inválidas' });
        }

        const senhaValida = await usuario.compareSenha(senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        const token = usuario.generateAuthToken();

        res.json({
            mensagem: 'Login realizado com sucesso!',
            usuario,
            token
        });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao realizar login', detalhes: err.message });
    }
};

exports.atualizarPreferencias = async (req, res) => {
  try {
    const { preferencias_turisticas } = req.body;
    const { id } = req.params;

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { preferencias_turisticas },
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({
      mensagem: 'Preferências atualizadas com sucesso!',
      usuario: usuarioAtualizado,
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao atualizar preferências',
      detalhes: err.message,
    });
  }
};