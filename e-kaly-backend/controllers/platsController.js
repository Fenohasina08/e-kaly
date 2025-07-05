 // controllers/platsController.js

// Importation du pool de connexion à la base PostgreSQL
const pool = require('../models/db'); // Ajuste le chemin si besoin

/**
 * Fonction asynchrone pour récupérer tous les plats
 * Possibilité de filtrer par catégorie via le paramètre de requête 'categorie'
 * @param {*} req - Objet requête Express
 * @param {*} res - Objet réponse Express
 */
async function getAllPlats(req, res) {
  // Récupération du paramètre 'categorie' dans la query string (ex: ?categorie=Plats traditionnels)
  const { categorie } = req.query;

  try {
    // Requête SQL de base pour récupérer tous les plats
    let query = 'SELECT * FROM plats';
    const params = []; // Tableau pour stocker les paramètres de la requête sécurisée

    // Si la catégorie est précisée, on ajoute une condition WHERE
    if (categorie) {
      query += ' WHERE categorie = $1'; // $1 est un placeholder pour la valeur sécurisée
      params.push(categorie);           // On ajoute la catégorie dans les paramètres
    }

    // Exécution de la requête avec ou sans filtre
    const result = await pool.query(query, params);

    // Envoi du résultat au frontend sous forme JSON
    res.json(result.rows);
  } catch (error) {
    // En cas d’erreur, log dans la console serveur
    console.error('Erreur lors de la récupération des plats :', error);

    // Envoi d’une réponse d’erreur 500 au client
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des plats.' });
  }
}

// Export de la fonction pour être utilisée dans les routes
module.exports = { getAllPlats };
