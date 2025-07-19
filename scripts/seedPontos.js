const mongoose = require('mongoose');
const PontoTuristico = require('../models/PontosTuristicos');

const pontos = [
  {
    nome: "Praia do Calhau",
    descricao: "Praia urbana com ondas ideais para surf e várias barracas à beira-mar.",
    tipo: ["praias", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.4936, longitude: -44.2527 },
    imagens: ["https://exemplo.com/imagens/praia-do-calhau.jpg"],
    tags: ["surf", "natureza", "pôr do sol"]
  },
  {
    nome: "Palácio dos Leões",
    descricao: "Sede do governo estadual e monumento histórico com vista para a Baía de São Marcos.",
    tipo: ["museus", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5305, longitude: -44.3043 },
    imagens: ["https://exemplo.com/imagens/palacio-dos-leoes.jpg"],
    tags: ["histórico", "arquitetura", "colonial"]
  },
  {
    nome: "Lagoa da Jansen",
    descricao: "Área de lazer com bares, ciclovia e vista encantadora do pôr do sol.",
    tipo: ["diurno", "restaurantes"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.4846, longitude: -44.2640 },
    imagens: ["https://exemplo.com/imagens/lagoa-da-jansen.jpg"],
    tags: ["lazer", "romântico", "gastronomia"]
  },
  {
    nome: "Teatro Arthur Azevedo",
    descricao: "Segundo teatro mais antigo do Brasil, com arquitetura neoclássica preservada.",
    tipo: ["museus", "noturno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5290, longitude: -44.3017 },
    imagens: ["https://exemplo.com/imagens/teatro-arthur-azevedo.jpg"],
    tags: ["cultura", "histórico", "artes"]
  },
  {
    nome: "Rua do Giz",
    descricao: "Uma das ruas mais charmosas do Centro Histórico, tombada como patrimônio.",
    tipo: ["museus", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5308, longitude: -44.3035 },
    imagens: ["https://exemplo.com/imagens/rua-do-giz.jpg"],
    tags: ["fotografia", "histórico", "arquitetura"]
  },
  {
    nome: "Convento das Mercês",
    descricao: "Antigo convento transformado em museu e centro cultural.",
    tipo: ["museus", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5335, longitude: -44.2961 },
    imagens: ["https://exemplo.com/imagens/convento-das-merces.jpg"],
    tags: ["arte", "história", "cultura"]
  },
  {
    nome: "Casa do Maranhão",
    descricao: "Museu dedicado às manifestações culturais do estado.",
    tipo: ["museus", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5297, longitude: -44.3062 },
    imagens: ["https://exemplo.com/imagens/casa-do-maranhao.jpg"],
    tags: ["folclore", "cultura", "regional"]
  },
  {
    nome: "Espigão Costeiro da Ponta D’Areia",
    descricao: "Passarela à beira-mar com vista panorâmica e pontos de pesca.",
    tipo: ["praias", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.4764, longitude: -44.2898 },
    imagens: ["https://exemplo.com/imagens/espigao-da-ponta-dareia.jpg"],
    tags: ["natureza", "pôr do sol", "lazer"]
  },
  {
    nome: "Centro de Cultura Popular Domingos Vieira Filho",
    descricao: "Museu com acervo de arte sacra e manifestações populares maranhenses.",
    tipo: ["museus", "diurno"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.5302, longitude: -44.3030 },
    imagens: ["https://exemplo.com/imagens/centro-de-cultura-popular.jpg"],
    tags: ["religião", "histórico", "arte popular"]
  },
  {
    nome: "Praia de São Marcos",
    descricao: "Praia famosa pelas festas, bares à beira-mar e prática de esportes.",
    tipo: ["praias", "noturno", "baladas"],
    cidade: "São Luís",
    estado: "MA",
    pais: "Brasil",
    coordenadas: { latitude: -2.4949, longitude: -44.2372 },
    imagens: ["https://exemplo.com/imagens/praia-de-sao-marcos.jpg"],
    tags: ["balada", "surf", "gastronomia", "noite"]
  }
];

async function seed() {
  try {
    await mongoose.connect('mongodb+srv://dheurymy:dheurymy@dheurymy.gsbco.mongodb.net/marago');
    await PontoTuristico.deleteMany(); // Limpa os anteriores (opcional)
    const inseridos = await PontoTuristico.insertMany(pontos);
    console.log(`✅ ${inseridos.length} pontos turísticos inseridos!`);
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Erro ao popular banco:', err.message);
  }
}

seed();