import React from 'react'
import Header from './components/Header';
import Hero from './components/Hero';
import Plat from './components/Plat';
import Temoignages from './components/Temoignage';
import Partenaires from './components/Partenaires';
import PlatsPopulaires from './components/PlatsPopulaires';
function App() {
  return (
    <div className='bg-gray-100'>
      <Header />
      <Hero />
      <PlatsPopulaires />
      <Plat />
      <Temoignages />
      <Partenaires />
    </div>
  )
}
export default App
