const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const userModel = require('../models/userModel');

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Mot de passe ≥ 8 caractères'),
    body('full_name')
      .isLength({ min: 2 })
      .withMessage('Nom trop court')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password, full_name } = req.body;

      const existing = await userModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'Email déjà utilisé' });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await userModel.createUser({ email, passwordHash, fullName: full_name });

      res.status(201).json({
        id: user.id,
        email: user.email,
        full_name: user.full_name
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis')
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

// logout côté API = "fake" ; côté client, on supprime juste le token
router.post('/logout', (req, res) => {
  res.json({ message: 'Déconnecté côté client (token à supprimer)' });
});

module.exports = router;