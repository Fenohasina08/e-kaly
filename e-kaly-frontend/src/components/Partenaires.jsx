 import React from "react";

const partenaires = [
  { 
    nom: "Google", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", 
    url: "https://google.com" 
  },
  { 
    nom: "Microsoft", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", 
    url: "https://microsoft.com" 
  },
  { 
    nom: "Apple", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", 
    url: "https://apple.com" 
  },
  { 
    nom: "Amazon", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", 
    url: "https://amazon.com" 
  },
  { 
    nom: "Facebook", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg", 
    url: "https://facebook.com" 
  },
  { 
    nom: "Netflix", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", 
    url: "https://netflix.com" 
  },
  { 
    nom: "Spotify", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", 
    url: "https://spotify.com" 
  },
  { 
    nom: "Adobe", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg", 
    url: "https://adobe.com" 
  },
  { 
    nom: "PayPal", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg", 
    url: "https://paypal.com" 
  },
  { 
    nom: "Uber", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Uber_Logo_2018.svg", 
    url: "https://uber.com" 
  },
];

export default function Partenaires() {
  return (
    <section className="max-w-6xl px-4 mx-auto my-16">
      <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
        Nos partenaires internationaux
      </h2>
      <p className="mb-10 text-center text-gray-600">
        Nous collaborons avec des leaders mondiaux pour vous offrir le meilleur service
      </p>

      <div className="grid items-center justify-center grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        {partenaires.map((partenaire, index) => (
          <a
            key={index}
            href={partenaire.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-24 p-4 transition bg-white border rounded-lg hover:shadow-lg"
            title={partenaire.nom}
          >
            <img
              src={partenaire.logo}
              alt={partenaire.nom}
              className="object-contain max-w-full transition-all duration-300 max-h-12 filter grayscale hover:grayscale-0"
            />
          </a>
        ))}
      </div>
    </section>
  );
}