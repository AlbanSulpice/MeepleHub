// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    await User.create(nom, email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully ✅' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id_utilisateur,
        nom: user.nom,
        is_admin: user.is_admin // ✅ On ajoute is_admin dans le token
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  res.json({ message: 'Déconnexion réussie 👋' });
};

exports.promoteToAdmin = async (req, res) => {
  const { code } = req.body;

  // Code arbitraire
  if (code !== 'admin42') {
    return res.status(403).json({ message: 'Code incorrect' });
  }

  try {
    await User.setAdmin(req.user.id);
    res.json({ message: 'Tu es désormais admin 🔑' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
