 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Plat from './components/Plat';
import Temoignages from './components/Temoignages';
import Partenaires from './components/Partenaires';
import PlatsPopulaires from './components/PlatsPopulaires';
import Footer from './components/Footer';
import PlatsParCategorie from './components/PlatParCategorie';
import Connecter from './components/Connecter';
import Commander from './components/Commander';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="bg-gray-100">
            <Header />
            <Hero />
            <PlatsPopulaires />
            <Plat />
            <Temoignages />
            <Partenaires />
            <Footer />
          </div>
        } />
        <Route path="/categorie/:categorie" element={<PlatsParCategorie />} />
        <Route path="/connecter" element={<Connecter />} />
        <Route path="/commander" element={<Commander />} />
      </Routes>
    </Router>
  );
}

export default App;