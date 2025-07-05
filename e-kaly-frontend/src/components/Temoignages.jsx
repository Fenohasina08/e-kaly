import React from "react";

const avis = [
  {
    nom: "Rija Andrianarisoa",
    message: "Le service est rapide, les plats sont toujours chauds et délicieux. Je recommande vivement !",
    avatar: "/images/avatar1.jpg",
    note: 5,
  },
  {
    nom: "Fanja Raharison",
    message: "J'adore la variété des menus ! C’est devenu mon site préféré pour commander le déjeuner.",
    avatar: "/images/avatar2.jpg",
    note: 4,
  },
  {
    nom: "Tojo Rakoto",
    message: "Simple, rapide et efficace. Les livreurs sont aussi très polis. Bravo e-Kaly !",
    avatar: "/images/avatar3.jpg",
    note: 5,
  },
];

export default function Temoignages() {
  return (
    <section className="px-4 my-16 bg-gray-100">
      {/* Titre + accroches */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Témoignages</h2>
        <p className="mt-2 text-lg text-gray-600">
          Des centaines de clients ont déjà fait confiance à e-Kaly pour leurs repas quotidiens.
        </p>
        <p className="mt-1 text-lg text-gray-600">
          Et si vous goûtiez la différence aujourd’hui ?
        </p>
      </div>

      {/* Liste des témoignages */}
      <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {avis.map((client, index) => (
          <div
            key={index}
            className="p-6 text-center transition bg-white shadow-lg rounded-xl hover:shadow-xl"
          >
            {/* Avatar en bulle */}
            <div className="w-20 h-20 mx-auto mb-4 overflow-hidden border-4 border-yellow-400 rounded-full">
              <img
                src={client.avatar}
                alt={client.nom}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Nom */}
            <h3 className="text-xl font-semibold text-gray-800">{client.nom}</h3>

            {/* Étoiles */}
            <div className="flex justify-center gap-1 my-2">
              {Array.from({ length: client.note }, (_, i) => (
                <span key={i} className="text-xl text-yellow-400">★</span>
              ))}
            </div>

            {/* Message */}
            <p className="italic text-gray-600">“{client.message}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
