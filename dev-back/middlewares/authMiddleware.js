const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // format "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les infos utilisateur à req.user
    next(); // Passe à la suite
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token.' });
  }
};
exports.verifyAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: 'Accès refusé : admin requis' });
  }
  next();
};
