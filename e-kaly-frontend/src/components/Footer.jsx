export default function Footer() {
  return (
    <footer className="px-6 py-10 text-gray-200 bg-gray-900">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-4">
        
        {/* Colonne 1 - Logo et slogan */}
        <div>
          <h2 className="mb-3 text-2xl font-bold">e-kaly</h2>
          <p className="text-sm italic text-yellow-400">Le goût unique de Madagascar</p>
        </div>
        
        {/* Colonne 2 - Menu */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Accueil</a></li>
            <li><a href="#" className="hover:text-yellow-400">Nos Recettes</a></li>
            <li><a href="#" className="hover:text-yellow-400">A propos</a></li>
          </ul>
        </div>
        
        {/* Colonne 3 - Infos pratiques */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Infos Pratiques</h3>
          <p className="text-sm">
            📍 123 Rue de la Cuisine, Paris<br />
            🕒 Lun-Dim : 11h - 23h<br />
            📞 +33 1 23 45 67 89<br />
            ✉️ contact@chefsdelight.fr
          </p>
        </div>
        
        {/* Colonne 4 - Réseaux sociaux + newsletter */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Réseaux Sociaux</h3>
            <div className="flex mb-6 space-x-4 text-yellow-400">
                <a href="#" aria-label="Facebook" className="hover:text-yellow-500" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.325 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.725 0 1.325-.6 1.325-1.326V1.326C24 .6 23.4 0 22.675 0z"/>
                    </svg>
                </a>

                <a href="#" aria-label="Instagram" className="hover:text-yellow-500" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.5 2a1 1 0 110 2 1 1 0 010-2zm-4.25 1.5a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5z"/>
                    </svg>
                </a>

                <a href="#" aria-label="Twitter" className="hover:text-yellow-500" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.724 9.986 9.986 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.822 4.822 0 001.523 6.573 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.787-.023-1.17-.067a13.945 13.945 0 007.557 2.209c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633A9.936 9.936 0 0024 4.59z"/>
                    </svg>
                </a>
            </div>

          <h3 className="mb-3 text-lg font-semibold">Newsletter</h3>
          <form>
            <input 
              type="email" 
              placeholder="Votre email" 
              className="w-full p-2 text-gray-200 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-yellow-400"
              required
            />
            <button 
              type="submit" 
              className="w-full py-2 mt-3 font-semibold text-gray-900 transition bg-yellow-400 rounded hover:bg-yellow-500"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-10 text-xs text-center text-gray-500">
        © 2025 Chef’s Delight. Tous droits réservés.
      </div>
    </footer>
  );
}
