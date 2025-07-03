import React from 'react'
import Header from './components/Header';
import Hero from './components/Hero';
import Plat from './components/Plat';
import Temoignages from './components/Temoignage';
function App() {
  return (
    <div className='bg-gray-100'>
      <Header />
      <Hero />
      <Plat />
      <Temoignages />
    </div>
  )
}
export default App
