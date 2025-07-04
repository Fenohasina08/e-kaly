 import React from "react";
 export default function CarteCategorie({ titre, image }) {
  return (
    <div className="flex flex-col w-[450px] h-[300px] sm:w-[280px] sm:h-[330px] md:w-[300px] md:h-[350px] lg:w-[320px] lg:h-[380px] 
                bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">

      {/* Image : 80% de la hauteur */}
      <div className="w-full h-4/5">
        <img src={image} alt={titre} className="object-cover w-full h-full" />
      </div>

      {/* Texte : 20% de la hauteur */}
      <div className="flex items-center justify-center w-full bg-white h-1/5">
        <h3 className="text-xl font-bold text-center text-gray-800">{titre}</h3>
      </div>

    </div>
  );
}
