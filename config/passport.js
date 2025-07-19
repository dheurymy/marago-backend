const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

require('dotenv').config(); 

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Verifica se o usuário já existe pelo googleId
      let usuario = await Usuario.findOne({ googleId: profile.id });

      // Se não existe, cria um novo
      if (!usuario) {
        usuario = await Usuario.create({
          nome: profile.displayName,
          usuario: profile.id, //customizar depois
          email: profile.emails[0].value,
          avatar_url: profile.photos[0].value,
          googleId: profile.id,
        });
      }

      // Retorna o usuário autenticado
      return done(null, usuario);
    } catch (err) {
      return done(err, null);
    }
  }
));