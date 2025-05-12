const db = require('../config/db');

// 🔹 1. Récupérer tous les jeux (id_jeu, nom)
exports.getAllGames = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_jeu, nom FROM jeu');
    res.json(rows);
  } catch (err) {
    console.error('Erreur getAllGames:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 🔹 2. Récupérer les messages pour un jeu donné
exports.getMessagesByGame = async (req, res) => {
  const { id_jeu } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT m.message, m.date_creation, u.nom
      FROM messages_forum m
      JOIN utilisateur u ON m.id_utilisateur = u.id_utilisateur
      WHERE m.id_jeu = ?
      ORDER BY m.date_creation ASC
    `, [id_jeu]);
    res.json(rows);
  } catch (err) {
    console.error('Erreur getMessagesByGame:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 🔹 3. Poster un message dans un jeu
exports.postMessage = async (req, res) => {
  const { id_jeu, message } = req.body;
  const id_utilisateur = req.user.id; // Important : nom identique à ta BDD

  if (!id_jeu || !message) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    await db.query(
      'INSERT INTO messages_forum (id_jeu, id_utilisateur, message) VALUES (?, ?, ?)',
      [id_jeu, id_utilisateur, message]
    );
    res.status(201).json({ message: 'Message posté avec succès' });
  } catch (err) {
    console.error('Erreur postMessage:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
