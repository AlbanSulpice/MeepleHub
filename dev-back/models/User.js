const db = require('../config/db');

const User = {
  create: async (nom, email, mot_de_passe) => {
    const [result] = await db.query(
      'INSERT INTO utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)',
      [nom, email, mot_de_passe]
    );
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query(
      'SELECT id_utilisateur, nom, email, mot_de_passe, is_admin FROM utilisateur WHERE email = ?',
      [email]
    );
    return rows[0];
  },
  setAdmin: async (id_utilisateur) => {
    await db.query(
      'UPDATE utilisateur SET is_admin = TRUE WHERE id_utilisateur = ?',
      [id_utilisateur]
    );
  }
};

module.exports = User;