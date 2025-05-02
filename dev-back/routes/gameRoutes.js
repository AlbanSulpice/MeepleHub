const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verifyToken } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jeu');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// Liker un jeu
router.post('/like', verifyToken, async (req, res) => {
  console.log("TOKEN PAYLOAD DECODED >>>", req.user); // 👈 ajoute ça

  const id_utilisateur = req.user.id;
  const { id_jeu } = req.body;

  if (!id_jeu) {
    return res.status(400).json({ message: 'id_jeu manquant' });
  }

  try {
    const [existing] = await db.query(
      'SELECT * FROM jeu_favori WHERE id_utilisateur = ? AND id_jeu = ?',
      [id_utilisateur, id_jeu]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Jeu déjà liké' });
    }

    await db.query(
      'INSERT INTO jeu_favori (id_utilisateur, id_jeu, date_ajout) VALUES (?, ?, NOW())',
      [id_utilisateur, id_jeu]
    );

    res.status(201).json({ message: 'Jeu liké avec succès ✅' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/liked', verifyToken, async (req, res) => {
  const id_utilisateur = req.user.id;

  try {
    const [rows] = await db.query(`
      SELECT j.*
      FROM jeu_favori jf
      JOIN jeu j ON jf.id_jeu = j.id_jeu
      WHERE jf.id_utilisateur = ?
    `, [id_utilisateur]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Obtenir les détails d’un jeu
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM jeu WHERE id_jeu = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Jeu non trouvé' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;