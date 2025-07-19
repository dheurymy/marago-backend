const PontoTuristico = require('../models/PontosTuristicos');

// Criar novo ponto turístico
exports.criarPonto = async (req, res) => {
  try {
    const novoPonto = new PontoTuristico(req.body);
    await novoPonto.save();

    res.status(201).json({
      mensagem: 'Ponto turístico criado com sucesso!',
      ponto: novoPonto,
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao criar ponto turístico',
      detalhes: err.message,
    });
  }
};

// Buscar todos os pontos turísticos
exports.listarPontos = async (req, res) => {
  try {
    const pontos = await PontoTuristico.find({ ativo: true }); // apenas ativos
    res.json(pontos);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao buscar pontos turísticos',
      detalhes: err.message,
    });
  }
};

// Buscar ponto turístico por ID
exports.buscarPorId = async (req, res) => {
  try {
    const ponto = await PontoTuristico.findById(req.params.id);

    if (!ponto) {
      return res.status(404).json({ erro: 'Ponto turístico não encontrado' });
    }

    res.json(ponto);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao buscar ponto turístico',
      detalhes: err.message,
    });
  }
};

// Atualizar ponto turístico por ID
exports.atualizarPonto = async (req, res) => {
  try {
    const pontoAtualizado = await PontoTuristico.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!pontoAtualizado) {
      return res.status(404).json({ erro: 'Ponto turístico não encontrado' });
    }

    res.json({
      mensagem: 'Ponto turístico atualizado com sucesso!',
      ponto: pontoAtualizado,
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao atualizar ponto turístico',
      detalhes: err.message,
    });
  }
};

// Deletar ponto turístico por ID
exports.deletarPonto = async (req, res) => {
  try {
    const pontoRemovido = await PontoTuristico.findByIdAndDelete(req.params.id);

    if (!pontoRemovido) {
      return res.status(404).json({ erro: 'Ponto turístico não encontrado' });
    }

    res.json({ mensagem: 'Ponto turístico deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao deletar ponto turístico',
      detalhes: err.message,
    });
  }
};

// Buscar pontos por tipo ou tags
exports.buscarPorFiltro = async (req, res) => {
  try {
    const { tipo, tags } = req.query;

    // Prepara o filtro
    const filtro = {};

    if (tipo) {
      // Se vier mais de um tipo, divide por vírgula
      const tiposArray = tipo.split(',').map(item => item.trim());
      filtro.tipo = { $in: tiposArray };
    }

    if (tags) {
      const tagsArray = tags.split(',').map(item => item.trim());
      filtro.tags = { $in: tagsArray };
    }

    // Busca apenas pontos ativos que batem com o filtro
    const pontos = await PontoTuristico.find({
      ativo: true,
      ...filtro
    });

    res.json(pontos);
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao buscar pontos com filtros',
      detalhes: err.message
    });
  }
};

exports.criarPontoComImagem = async (req, res) => {
  try {
    const dados = req.body;
    
    // pega a URL da imagem enviada
    if (req.file && req.file.path) {
      dados.imagens = [req.file.path];
    }

    const novoPonto = new PontoTuristico(dados);
    await novoPonto.save();

    res.status(201).json({
      mensagem: 'Ponto criado com imagem!',
      ponto: novoPonto
    });
  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao cadastrar ponto com imagem',
      detalhes: err.message
    });
  }
};