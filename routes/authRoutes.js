const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Gera token JWT usando método do modelo
        const token = req.user.generateAuthToken();

        // 🔁 Retorna como JSON ou redireciona
        res.json({
            mensagem: 'Login com Google realizado com sucesso!',
            usuario: req.user,
            token: token
        });

        
    }
);

module.exports = router;