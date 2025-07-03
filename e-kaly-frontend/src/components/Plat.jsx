import React from "react";
import CarteCategorie from "./CarteCategorie";

export default function Plat() {
    const categories = [
  { titre: 'Plats traditionnels', image: '/images/romazava.jpg' },
  { titre: 'Volaille & Viandes', image: '/images/viande.jpg' },
  { titre: 'Snacks & Street-food', image: '/images/snack.jpg' },
  { titre: 'Desserts', image: '/images/dessert.jpg' },
  { titre: 'Accompagnements', image: '/images/lasary.jpg' },
  { titre: 'Plats végétariens', image: '/images/vegan.jpg' },
];

    
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl text-center">Ce que nous offrons</h2>
        
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat, index) => (
          <CarteCategorie key={index} titre={cat.titre} image={cat.image} />
        ))}
      </div>
        </div>

        

    )
}