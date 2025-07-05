-- Création de la table plats
CREATE TABLE plats (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  description TEXT,
  prix NUMERIC(10, 2) NOT NULL,
  image_url TEXT
);
