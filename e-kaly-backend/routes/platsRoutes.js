 // On importe express pour créer un routeur modulaire
const express = require('express');
const router = express.Router();

// On importe la fonction getAllPlats depuis le controller
const { getAllPlats } = require('../controllers/platsController');

// On associe la route GET '/' à la fonction getAllPlats
router.get('/', getAllPlats);

// On exporte le routeur pour l'utiliser dans server.js
module.exports = router;
