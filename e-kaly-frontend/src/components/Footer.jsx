 export default function Footer() {
  return (
    <footer className="px-6 py-12 text-gray-200 bg-gray-900">
      <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Colonne 1 - Logo et description */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-lg">
              <span className="text-xl font-bold text-gray-900">🍽️</span>
            </div>
            <h2 className="text-2xl font-bold text-white">e-kaly</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            La plateforme qui vous connecte aux saveurs authentiques de Madagascar. 
            Livraison rapide et plats traditionnels préparés avec passion.
          </p>
          <div className="flex items-center gap-2 text-yellow-400">
            <span>⭐</span>
            <span className="text-sm">4.8/5 - 500+ avis clients</span>
          </div>
        </div>
        
        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="block transition duration-200 transform hover:text-yellow-400 hover:translate-x-1">
                🏠 Accueil
              </a>
            </li>
            <li>
              <a href="#" className="block transition duration-200 transform hover:text-yellow-400 hover:translate-x-1">
                📖 Recettes
              </a>
            </li>
            
            <li>
              <a href="#" className="block transition duration-200 transform hover:text-yellow-400 hover:translate-x-1">
                📞 Nous Contacter
              </a>
            </li>
            <li>
              <a href="#" className="block transition duration-200 transform hover:text-yellow-400 hover:translate-x-1">
                ❓ FAQ
              </a>
            </li>
          </ul>
        </div>
        
        {/* Colonne 3 - Contact & Horaires */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Nous Trouver</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 mt-0.5">📍</span>
              <div>
                <p className="font-medium">Antananarivo, Madagascar</p>
                <p className="text-gray-400">Lot IVC 67 Ambohijatovo</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">🕒</span>
              <div>
                <p className="font-medium">Lun - Dim : 10h - 22h</p>
                <p className="text-gray-400">Livraison jusqu'à 21h30</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">📞</span>
              <a href="tel:+261341234567" className="transition hover:text-yellow-400">
                +261 34 12 345 67
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-400">✉️</span>
              <a href="mailto:contact@e-kaly.mg" className="transition hover:text-yellow-400">
                contact@e-kaly.mg
              </a>
            </div>
          </div>
        </div>
        
        {/* Colonne 4 - Newsletter & Réseaux */}
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
            <p className="mb-3 text-sm text-gray-300">
              Recevez nos offres spéciales et nouveaux plats en exclusivité
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="w-full px-6 py-3 font-semibold text-gray-900 transition-all bg-yellow-400 rounded-lg hover:bg-yellow-500 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                S'abonner ✓
              </button>
            </form>
          </div>

           <div>
  <h3 className="mb-3 text-lg font-semibold text-white">Suivez-nous</h3>
  <div className="flex gap-4">
    {[
      { 
        name: "Facebook", 
        icon: (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ), 
        color: "hover:text-blue-500" 
      },
      { 
        name: "Instagram", 
        icon: (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.017 0C8.396 0 7.986.016 6.756.072 5.526.127 4.712.332 3.995.63c-.789.321-1.459.742-2.12 1.403-.661.66-1.082 1.33-1.403 2.12-.298.717-.502 1.531-.558 2.761C.016 7.986 0 8.396 0 12.017c0 3.62.016 4.03.072 5.26.056 1.23.26 2.044.558 2.761.321.789.742 1.459 1.403 2.12.66.661 1.33 1.082 2.12 1.403.717.298 1.531.502 2.761.558 1.23.056 1.64.072 5.26.072 3.62 0 4.03-.016 5.26-.072 1.23-.056 2.044-.26 2.761-.558.789-.321 1.459-.742 2.12-1.403.661-.66 1.082-1.33 1.403-2.12.298-.717.502-1.531.558-2.761.056-1.23.072-1.64.072-5.26 0-3.62-.016-4.03-.072-5.26-.056-1.23-.26-2.044-.558-2.761-.321-.789-.742-1.459-1.403-2.12-.66-.661-1.33-1.082-2.12-1.403-.717-.298-1.531-.502-2.761-.558C16.047.016 15.637 0 12.017 0zm0 2.158c3.504 0 3.882.013 5.095.068 1.13.051 1.743.24 2.152.4.545.212 1.035.545 1.515 1.025.48.48.813.97 1.025 1.515.16.409.349 1.022.4 2.152.055 1.213.068 1.591.068 5.095 0 3.504-.013 3.882-.068 5.095-.051 1.13-.24 1.743-.4 2.152-.212.545-.545 1.035-1.025 1.515-.48.48-.97.813-1.515 1.025-.409.16-1.022.349-2.152.4-1.213.055-1.591.068-5.095.068-3.504 0-3.882-.013-5.095-.068-1.13-.051-1.743-.24-2.152-.4-.545-.212-1.035-.545-1.515-1.025-.48-.48-.813-.97-1.025-1.515-.16-.409-.349-1.022-.4-2.152C2.171 15.899 2.158 15.521 2.158 12.017c0-3.504.013-3.882.068-5.095.051-1.13.24-1.743.4-2.152.212-.545.545-1.035 1.025-1.515.48-.48.97-.813 1.515-1.025.409-.16 1.022-.349 2.152-.4 1.213-.055 1.591-.068 5.095-.068zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        ), 
        color: "hover:text-pink-500" 
      },
      { 
        name: "TikTok", 
        icon: (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        ), 
        color: "hover:text-black" 
      },
      { 
        name: "WhatsApp", 
        icon: (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.444"/>
          </svg>
        ), 
        color: "hover:text-green-500" 
      }
    ].map((social) => (
      <a
        key={social.name}
        href="#"
        className={`text-gray-400 transition transform hover:scale-110 ${social.color}`}
        title={social.name}
      >
        {social.icon}
      </a>
    ))}
  </div>
</div>
        </div>
      </div>
      
      {/* Bas du footer */}
      <div className="pt-8 mt-8 border-t border-gray-700">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-gray-400">
            © 2024 <span className="text-yellow-400">e-kaly</span>. Tous droits réservés.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition hover:text-yellow-400">Confidentialité</a>
            <a href="#" className="transition hover:text-yellow-400">CGU</a>
            <a href="#" className="transition hover:text-yellow-400">Cookies</a>
            <a href="#" className="transition hover:text-yellow-400">Mentions légales</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>🚀</span>
            <span>Développé avec passion pour Madagascar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}