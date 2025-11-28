const express = require('express');
const { requireAuth } = require('../middleware/auth');
const userModel = require('../models/userModel');

const router = express.Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;