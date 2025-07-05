 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Plat from './components/Plat';
import Temoignages from './components/Temoignages';
import Partenaires from './components/Partenaires';
import PlatsPopulaires from './components/PlatsPopulaires';
import Footer from './components/Footer';
import PlatsParCategorie from './components/PlatParCategorie';  // Nouveau composant pour afficher les plats par catégorie

function App() {
  return (
    // Le Router englobe toute l'application et permet la navigation entre différentes pages sans recharger
    <Router>
      <Routes>
        {/* Route principale '/' affichant la page d'accueil avec toutes les sections */}
        <Route path="/" element={
          <div className='bg-gray-100'>
            <Header />
            <Hero />
            <PlatsPopulaires />
            <Plat /> {/* Page affichant les catégories */}
            <Temoignages />
            <Partenaires />
            <Footer />
          </div>
        } />
        {/* Route dynamique '/categorie/:categorie' qui affiche les plats selon la catégorie choisie */}
        <Route path="/categorie/:categorie" element={<PlatsParCategorie />} />
      </Routes>
    </Router>
  );
}

export default App;
