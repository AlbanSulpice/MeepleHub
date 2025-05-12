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
      SELECT m.id, m.message, m.date_creation, m.id_utilisateur, u.nom
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
  // Vérifier si l'utilisateur est bloqué
const [rows] = await db.query(
  'SELECT est_bloque FROM utilisateur WHERE id_utilisateur = ?',
  [id_utilisateur]
);

if (rows.length === 0) {
  return res.status(404).json({ message: 'Utilisateur introuvable' });
}

if (rows[0].est_bloque) {
  return res.status(403).json({ message: 'Vous êtes bloqué et ne pouvez pas écrire dans le forum.' });
}

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
exports.deleteMessage = async (req, res) => {
  const id_message = req.params.id;
  const id_utilisateur = req.user.id;

  try {
    const [rows] = await db.query(
      'SELECT id_utilisateur FROM messages_forum WHERE id = ?',
      [id_message]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Message introuvable' });
    }

    if (rows[0].id_utilisateur !== id_utilisateur) {
      return res.status(403).json({ message: 'Non autorisé à supprimer ce message' });
    }

    await db.query('DELETE FROM messages_forum WHERE id = ?', [id_message]);
    res.json({ message: 'Message supprimé ✅' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur suppression message' });
  }
};

