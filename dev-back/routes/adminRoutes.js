const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.use(verifyToken, verifyAdmin);

router.post('/jeu', adminController.createGame);
router.put('/jeu/:id', adminController.updateGame);
router.delete('/jeu/:id', adminController.deleteGame);

router.get('/utilisateurs', adminController.getAllUsers);
router.put('/utilisateur/:id/blocage', adminController.toggleUserBlock);

module.exports = router;
