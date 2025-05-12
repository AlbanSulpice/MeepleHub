const db = require('../config/db');

exports.createGame = async (req, res) => {
  const { nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total } = req.body;
  try {
    await db.query(
      `INSERT INTO jeu (nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total, quantite_disponible)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total, quantite_total]
    );
    res.status(201).json({ message: 'Jeu ajouté ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur ajout jeu' });
  }
};

exports.updateGame = async (req, res) => {
  const id = req.params.id;
  const { nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total } = req.body;

  try {
    await db.query(
      `UPDATE jeu
       SET nom = ?, description = ?, duree = ?, nb_joueurs_min = ?, nb_joueurs_max = ?, quantite_total = ?
       WHERE id_jeu = ?`,
      [nom, description, duree, nb_joueurs_min, nb_joueurs_max, quantite_total, id]
    );
    res.json({ message: 'Jeu modifié ✏️' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur modification jeu' });
  }
};

exports.deleteGame = async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM jeu WHERE id_jeu = ?', [id]);
    res.json({ message: 'Jeu supprimé 🗑️' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur suppression jeu' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id_utilisateur, nom, email, is_admin, est_bloque FROM utilisateur');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur chargement utilisateurs' });
  }
};


exports.toggleUserBlock = async (req, res) => {
  const id = req.params.id;
  const { est_bloque } = req.body;

  try {
    await db.query('UPDATE utilisateur SET est_bloque = ? WHERE id_utilisateur = ?', [est_bloque, id]);
    res.json({ message: `Utilisateur ${est_bloque ? 'bloqué' : 'débloqué'} 🚫` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur blocage utilisateur' });
  }
};
