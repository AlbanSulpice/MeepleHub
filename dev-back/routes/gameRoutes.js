const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middlewares/authMiddleware');

// Like d’un jeu
router.post('/like', verifyToken, async (req, res) => {
  const id_utilisateur = req.user.id;
  const { id_jeu } = req.body;

  if (!id_jeu) {
    return res.status(400).json({ message: 'id_jeu requis' });
  }

  try {
    // Vérifie s’il a déjà liké (évite doublon)
    const [existing] = await db.query(
      'SELECT * FROM jeu_favori WHERE id_utilisateur = ? AND id_jeu = ?',
      [id_utilisateur, id_jeu]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Jeu déjà liké' });
    }

    // Insertion du like
    await db.query(
      'INSERT INTO jeu_favori (id_utilisateur, id_jeu, date_ajout) VALUES (?, ?, NOW())',
      [id_utilisateur, id_jeu]
    );

    res.status(201).json({ message: 'Like ajouté avec succès ✅' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;