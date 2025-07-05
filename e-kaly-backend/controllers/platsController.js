 // On importe le pool de connexion à PostgreSQL depuis le dossier models
const pool = require('../models/db');

// Fonction asynchrone pour gérer la requête GET /api/plats
const getAllPlats = async (req, res) => {
  // Ce message s'affichera dans la console si la route est bien appelée
  console.log('✅ Requête GET /api/plats reçue');

  try {
    // On exécute une requête SQL pour récupérer tous les plats et les trier par ID croissant
    const result = await pool.query('SELECT * FROM plats ORDER BY id');

    // Si la requête réussit, on renvoie le tableau des plats au format JSON
    res.json(result.rows);
  } catch (err) {
    // En cas d'erreur SQL ou de connexion, on affiche un message dans la console
    console.error('❌ Erreur récupération plats :', err.message);

    // On envoie une réponse d’erreur HTTP 500 (erreur serveur)
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// On exporte la fonction pour pouvoir l’utiliser dans les routes
module.exports = { getAllPlats };
