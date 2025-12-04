 import React from "react";
import Sysco from "../../public/images/sysco.png";
import Nestle from "../../public/images/nestle.png";
import Bonduelle from "../../public/images/Bonduelle.png";
import Redbull from "../../public/images/redbull.png";
import Mvola from "../../public/images/mvola.png";
import Evian from "../../public/images/evian.png"
const partenaires = [
  {
    nom: "Sysco",
    logo: Sysco, // 🔄 Remplacé par ton image locale
    url: "https://sysco.com",
  },
  {
    nom: "Bonduelle",
    logo: Bonduelle, // 🔄 Remplacé par ton image locale
    url: "https://bonduelle.com",
  },
  {
    nom: "Nestlé Professional",
    logo: Nestle, // 🔄 Remplacé par ton image locale
    url: "https://www.nestleprofessional.com",
  },
  {
    nom: "Coca-Cola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    url: "https://www.coca-cola.com",
  },
  {
    nom: "Red Bull",
    logo: Redbull, // 🔄 Remplacé par ton image locale
    url: "https://www.redbull.com",
  },
  {
    nom: "Evian",
    logo: Evian,
    url: "https://www.evian.com",
  },
  {
    nom: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    url: "https://visa.com",
  },
  {
    nom: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    url: "https://mastercard.com",
  },
  {
    nom: "Mvola",
    logo: Mvola, // 🔄 Remplacé par ton image locale
    url: "https://www.mvola.mg",
  },
  {
    nom: "PayPal",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    url: "https://paypal.com",
  },
];

export default function Partenaires() {
  return (
    <section className="relative px-6 mx-auto my-24 max-w-7xl">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-50/60 to-white rounded-3xl"></div>

      <div className="relative z-10">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">
          Nos partenaires
        </h2>

        <p className="text-lg text-center text-gray-600 mb-14">
          Nous collaborons avec des entreprises essentielles pour garantir une expérience culinaire de qualité.
        </p>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5 place-items-center">
          {partenaires.map((p, index) => (
            <a
              key={index}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ouvrir le site de ${p.nom}`}
              className="flex items-center justify-center w-full p-4 transition-all duration-300 bg-white border shadow-sm group h-28 rounded-2xl hover:shadow-lg hover:scale-105"
            >
              <img
                src={p.logo}
                alt={`Logo ${p.nom}`}
                className="object-contain transition duration-300 max-h-16 opacity-80 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
