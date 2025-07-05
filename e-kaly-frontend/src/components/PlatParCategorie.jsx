 import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PlatsParCategorie() {
  // useParams permet de récupérer le paramètre dynamique "categorie" dans l’URL
  const { categorie } = useParams();

  // useState pour stocker la liste des plats reçus depuis l’API backend
  const [plats, setPlats] = useState([]);

  // useEffect se déclenche à chaque changement de catégorie pour fetcher les plats correspondants
  useEffect(() => {
    // Appel API avec le filtre sur la catégorie pour récupérer les plats associés
   fetch(`http://localhost:3001/api/plats?categorie=${encodeURIComponent(categorie)}`)

      .then(res => res.json())         // Conversion de la réponse en JSON
      .then(data => setPlats(data))    // Mise à jour du state avec les données reçues
      .catch(err => console.error('Erreur API:', err));  // Affichage d’erreur dans la console en cas de problème
  }, [categorie]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Lien pour revenir à la page principale des catégories */}
      <Link to="/" className="inline-block mb-4 text-blue-600 underline">← Retour aux catégories</Link>

      {/* Titre affichant la catégorie sélectionnée */}
      <h1 className="mb-6 text-3xl font-bold">Plats : {categorie}</h1>

      {/* Affichage conditionnel : message si aucun plat trouvé */}
      {plats.length === 0 ? (
        <p>Aucun plat trouvé dans cette catégorie.</p>
      ) : (
        // Liste des plats avec un style simple pour chaque élément
        <ul className="space-y-4">
          {plats.map(plat => (
            <li key={plat.id} className="p-4 bg-white border rounded shadow">
              <h2 className="text-xl font-semibold">{plat.nom}</h2>
              <p>{plat.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
