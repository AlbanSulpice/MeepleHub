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
      'SELECT * FROM utilisateur WHERE email = ?',
      [email]
    );
    return rows[0];
  }
};

module.exports = User;