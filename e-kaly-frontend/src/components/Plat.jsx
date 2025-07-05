 import React from "react";
import CarteCategorie from "./CarteCategorie.jsx";
import { Link } from 'react-router-dom';  // Import du Link pour la navigation interne

export default function Plat() {
  const categories = [
    { titre: 'Plats traditionnels', image: './images/plattraditionnel.jpg' },
    { titre: 'Volaille & Viandes', image: './images/Volaillesetviandes.webp' },
    { titre: 'Snacks & Street-food', image: './images/snacks.jpg' },
    { titre: 'Desserts', image: './images/desserts.jpg' },
    { titre: 'Plats végétariens', image: './images/Plat_végétarien.jpg' },
  ];

  return (
    <div className="flex flex-col gap-5 bg-gray-100">
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 font-semibold text-black transition-colors bg-yellow-500 rounded-full shadow hover:bg-yellow-600">
          Voir toutes les catégories
        </button>
      </div>

      <div className="flex flex-row items-center justify-center gap-8 px-4 overflow-x-auto">
        {/* Pour chaque catégorie, on crée un lien qui redirige vers la page des plats correspondante */}
        {categories.map((cat, index) => (
          <Link key={index} to={`/categorie/${encodeURIComponent(cat.titre)}`}>
            {/* Le composant CarteCategorie affiche l’image et le titre de la catégorie */}
            <CarteCategorie
              titre={cat.titre}
              image={cat.image}
              className="w-[250px] flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
