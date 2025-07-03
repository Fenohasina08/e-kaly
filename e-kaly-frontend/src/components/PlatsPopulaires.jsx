import React from "react";

const platsPopulaires = [
  {
    nom: "Romazava",
    image: "/images/plats/romazava.jpg",
    categorie: "Plats traditionnels",
  },
  {
    nom: "Poulet coco",
    image: "/images/plats/pouletcoco.jpg",
    categorie: "Viandes",
  },
  {
    nom: "Brochettes de zébu",
    image: "/images/plats/brochettes.jpg",
    categorie: "Street-food",
  },
  {
    nom: "Mofo anana",
    image: "/images/plats/mofoanana.jpg",
    categorie: "Végétarien",
  },
  {
    nom: "Koba",
    image: "/images/plats/koba.jpg",
    categorie: "Desserts",
  },
];

export default function PlatsPopulaires() {
  return (
    <section className="flex flex-col gap-5 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Nos plats les plus populaires
      </h2>

      <div className="flex flex-wrap justify-center gap-8 px-4">
        {platsPopulaires.map((plat, index) => (
          <div
            key={index}
            className="w-[250px] flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Image */}
            <div className="w-full h-4/5">
              <img
                src={plat.image}
                alt={plat.nom}
                className="object-cover w-full h-48"
              />
            </div>

            {/* Nom du plat */}
            <div className="flex flex-col items-center justify-center p-3 bg-white h-1/5">
              <h3 className="text-lg font-semibold text-gray-800">
                {plat.nom}
              </h3>
              <p className="text-sm text-gray-500">{plat.categorie}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
