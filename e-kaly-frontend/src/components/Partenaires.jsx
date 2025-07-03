import React from "react";

const partenaires = [
  { nom: "Restaurant A", logo: "/images/partner1.png", url: "#" },
  { nom: "Fournisseur B", logo: "/images/partner2.png", url: "#" },
  { nom: "Restaurant C", logo: "/images/partner3.png", url: "#" },
  { nom: "Fournisseur D", logo: "/images/partner4.png", url: "#" },
  { nom: "Restaurant E", logo: "/images/partner5.png", url: "#" },
    { nom: "Restaurant A", logo: "/images/partner1.png", url: "#" },
  { nom: "Fournisseur B", logo: "/images/partner2.png", url: "#" },
  { nom: "Restaurant C", logo: "/images/partner3.png", url: "#" },
  { nom: "Fournisseur D", logo: "/images/partner4.png", url: "#" },
  { nom: "Restaurant E", logo: "/images/partner5.png", url: "#" },
];

export default function Partenaires() {
  return (
    <section className="max-w-6xl px-4 mx-auto my-16">
      <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
        Nos partenaires
      </h2>
      <p className="mb-10 text-center text-gray-600">
        Nous collaborons avec les meilleurs pour vous offrir la meilleure qualité.
      </p>

      <div className="grid items-center justify-center grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        {partenaires.map((partenaire, index) => (
          <a
            key={index}
            href={partenaire.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 transition border rounded-lg hover:shadow-lg"
            title={partenaire.nom}
          >
            <img
              src={partenaire.logo}
              alt={partenaire.nom}
              className="object-contain max-h-16"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
