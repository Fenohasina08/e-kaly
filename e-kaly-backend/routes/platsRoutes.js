 const express = require('express');
const router = express.Router();

// Route GET sur /api/plats
router.get('/', (req, res) => {
  console.log('✅ Route /api/plats appelée');
  const plats = [
    { id: 1, nom: 'Pizza Margherita', prix: 8.5 },
    { id: 2, nom: 'Pâtes Carbonara', prix: 9.0 },
  ];
  res.json(plats);
});

module.exports = router;
