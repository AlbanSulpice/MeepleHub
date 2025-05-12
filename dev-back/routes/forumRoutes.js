const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Récupérer la liste des jeux (pour le menu déroulant)
router.get('/games', forumController.getAllGames);

// Récupérer les messages d’un jeu spécifique
router.get('/messages/:id_jeu', forumController.getMessagesByGame);

// Poster un message (authentification requise)
router.post('/messages', verifyToken, forumController.postMessage);

module.exports = router;
