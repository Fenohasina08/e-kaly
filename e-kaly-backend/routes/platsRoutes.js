 // routes/platsRoutes.js

const express = require('express');          // Import d’Express
const router = express.Router();             // Création du routeur Express modulaire

// Import de la fonction contrôleur qui gère la récupération des plats
const { getAllPlats } = require('../controllers/platsController');

// Association de la route GET '/' à la fonction getAllPlats
// Cela signifie que les requêtes vers '/api/plats' seront traitées ici
router.get('/', getAllPlats);

// Export du routeur pour l’utiliser dans server.js
module.exports = router;
