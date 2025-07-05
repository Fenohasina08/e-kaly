 // On importe la classe Pool depuis la bibliothèque 'pg' pour gérer un ensemble de connexions à PostgreSQL
const { Pool } = require('pg');

// On charge les variables d'environnement depuis le fichier .env
require('dotenv').config();

// On crée une instance de pool avec les paramètres de connexion à la base, récupérés depuis le fichier .env
const pool = new Pool({
  user: process.env.PGUSER,         // Nom de l'utilisateur PostgreSQL
  host: process.env.PGHOST,         // Hôte (serveur) PostgreSQL — généralement localhost
  database: process.env.PGDATABASE, // Nom de la base de données
  password: process.env.PGPASSWORD, // Mot de passe de l'utilisateur
  port: process.env.PGPORT,         // Port PostgreSQL (par défaut 5432)
});

// Ce bloc permet d’afficher un message d’erreur si le pool rencontre un problème de connexion
pool.on('error', (err) => {
  console.error('❌ Erreur de connexion inattendue au pool PostgreSQL :', err);
  process.exit(-1); // Stoppe le serveur en cas d’erreur critique
});

// On exporte le pool pour qu’il soit utilisable dans d'autres fichiers (comme les controllers)
module.exports = pool;
