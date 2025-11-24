 import React from "react";

const platsPopulaires = [
  {
    nom: "Romazava",
    image: "/images/romazava.jpeg", // ✅ Chemin direct
    categorie: "Plats traditionnels",
  },
  {
    nom: "Poulet coco",
    image: "/images/pouletcoco.jpg",
    categorie: "Viandes",
  },
  {
    nom: "Brochettes de zébu",
    image: "/images/brochettedezebu.jpg",
    categorie: "Street-food",
  },
  {
    nom: "Mofo anana",
    image: "/images/mofoanana.jpg",
    categorie: "Végétarien",
  },
  {
    nom: "Koba",
    image: "/images/koba.webp",
    categorie: "Desserts",
  },
];

export default function PlatsPopulaires() {
  return (
    <section className="py-16 bg-white">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Plats populaires
        </h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Les préférés de nos clients
        </p>
      </div>

      <div className="flex justify-center gap-8 px-6 pb-4 overflow-x-auto">
        {platsPopulaires.map((plat, index) => (
          <div
            key={index}
            className="flex-shrink-0 overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg w-72 hover:shadow-md"
          >
            <img
              src={plat.image}
              alt={plat.nom}
              className="object-cover w-full h-48"
            />
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {plat.nom}
                </h3>
                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                  {plat.categorie}
                </span>
              </div>
              
              <button className="w-full px-4 py-2 mt-3 text-sm font-medium text-white transition-colors bg-yellow-500 rounded hover:bg-yellow-600">
                Découvrir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}