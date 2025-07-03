import React from 'react';

export default function CarteCategorie({ titre, image }) {
  return (
    <div className="p-4 transition-transform bg-white rounded-lg shadow-md cursor-pointer hover:scale-105">
      <img src={image} alt={titre} className="object-cover w-full h-32 rounded-md" />
      <h3 className="mt-2 text-xl font-bold text-center">{titre}</h3>
    </div>
  );
}