 // 1️⃣ Importation des bibliothèques nécessaires
const express = require('express');   // Framework pour créer le serveur backend
const cors = require('cors');         // Middleware pour autoriser les requêtes Cross-Origin (depuis React)
const dotenv = require('dotenv');     // Permet de charger les variables d'environnement depuis le fichier .env

// 2️⃣ Importation du routeur des plats
const platsRoutes = require('./routes/platsRoutes');

// 3️⃣ Configuration dotenv pour charger les variables d'environnement
dotenv.config();

// 4️⃣ Création de l'application Express (notre serveur)
const app = express();

//pour connecter la base de données aux images dans public/images
app.use('/images', express.static('public/images'));


// 5️⃣ Définition du port sur lequel le serveur va écouter
//    On utilise la variable d'environnement PORT si elle existe, sinon 3001 par défaut
const PORT = process.env.PORT || 3001;

// 6️⃣ Ajout des middlewares essentiels
app.use(cors());              // Permet au frontend (React) de faire des requêtes au backend sans blocage CORS
app.use(express.json());      // Permet à Express de parser le corps des requêtes au format JSON

// 7️⃣ Configuration de la route pour les plats
//    Toute requête commençant par "/api/plats" sera gérée par le routeur platsRoutes
app.use('/api/plats', platsRoutes);

// 8️⃣ Démarrage du serveur sur le port défini
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
