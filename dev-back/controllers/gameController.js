const db = require('../config/db');

// ✅ Enregistrement ou mise à jour d'une note
exports.rateGame = async (req, res) => {
  const id_utilisateur = req.user.id;
  const id_jeu = req.params.id_jeu;
  const valeur = parseInt(req.body.note);

  if (!valeur || valeur < 1 || valeur > 5) {
    return res.status(400).json({ message: "La note doit être un entier entre 1 et 5." });
  }

  try {
    await db.query(
      `INSERT INTO note (id_utilisateur, id_jeu, valeur)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE valeur = ?`,
      [id_utilisateur, id_jeu, valeur, valeur]
    );

    res.json({ message: 'Note enregistrée ✅' });
  } catch (err) {
    console.error('Erreur dans rateGame :', err);
    res.status(500).json({ message: 'Erreur lors de l’enregistrement de la note' });
  }
};

// ✅ Récupération de la note d’un utilisateur pour un jeu
exports.getUserRating = async (req, res) => {
  const id_utilisateur = req.user.id;
  const id_jeu = req.params.id_jeu;

  try {
    const [rows] = await db.query(
      'SELECT valeur FROM note WHERE id_utilisateur = ? AND id_jeu = ?',
      [id_utilisateur, id_jeu]
    );

    if (rows.length > 0) {
      res.json({ note: rows[0].valeur });
    } else {
      res.json({ note: null });
    }
  } catch (err) {
    console.error('Erreur dans getUserRating :', err);
    res.status(500).json({ message: 'Erreur lors de la récupération de la note' });
  }
};

// ✅ Nouvelle version de getAllGames avec likes + moyenne
exports.getAllGames = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        j.id_jeu,
        j.nom,
        j.description,
        j.duree,
        j.nb_joueurs_min,
        j.nb_joueurs_max,
        j.quantite_total,
        j.quantite_disponible,
        (
          SELECT COUNT(*) 
          FROM jeu_favori jf 
          WHERE jf.id_jeu = j.id_jeu
        ) AS nb_likes,
        (
          SELECT ROUND(AVG(n.valeur), 1)
          FROM note n
          WHERE n.id_jeu = j.id_jeu
        ) AS note_moyenne
      FROM jeu j;
    `);

    res.json(rows);
  } catch (err) {
    console.error('Erreur getAllGames :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getRecommendations = async (req, res) => {
  const id_utilisateur = req.user.id;

  try {
    // 1. Obtenir les jeux likés par l’utilisateur
    const [likedRows] = await db.query(
      'SELECT id_jeu FROM jeu_favori WHERE id_utilisateur = ?',
      [id_utilisateur]
    );
    const likedIds = likedRows.map(row => row.id_jeu);

    if (likedIds.length === 0) return res.json([]); // Aucun like = aucune recommandation

    // 2. Obtenir les catégories de ces jeux
    const [catRows] = await db.query(
      'SELECT DISTINCT id_categorie FROM jeu_categorie WHERE id_jeu IN (?)',
      [likedIds]
    );
    const catIds = catRows.map(row => row.id_categorie);

    if (catIds.length === 0) return res.json([]);

    // 3. Obtenir les jeux de ces catégories que l’utilisateur n’a pas déjà likés
    const [recommended] = await db.query(`
      SELECT DISTINCT j.*
      FROM jeu j
      JOIN jeu_categorie jc ON j.id_jeu = jc.id_jeu
      WHERE jc.id_categorie IN (?)
        AND j.id_jeu NOT IN (?)
    `, [catIds, likedIds]);

    res.json(recommended);
  } catch (err) {
    console.error("Erreur dans getRecommendations:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
exports.getAverageRating = async (req, res) => {
  const id_jeu = req.params.id_jeu;
  try {
    const [rows] = await db.query(
      'SELECT ROUND(AVG(valeur), 1) AS note_moyenne FROM note WHERE id_jeu = ?',
      [id_jeu]
    );
    res.json({ note_moyenne: rows[0].note_moyenne });
  } catch (err) {
    console.error('Erreur moyenne note :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
