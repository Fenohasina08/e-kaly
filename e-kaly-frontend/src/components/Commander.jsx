 import React, { useEffect, useState, useRef } from 'react';
 import Header from './Header'
/**
 * Commander.jsx
 *
 * Refonte orientée "Option A — rework complet (mobile-first)".
 *
 * Changements clés (expliqués en commentaires FR près du code) :
 * - Panier sur mobile : bottom sheet (glissant depuis le bas). Sur desktop : sidebar sticky.
 * - Accessibilité : attributs aria (aria-label, role, aria-live), gestion du clavier (Esc pour fermer),
 *   tabIndex et focus management pour le bottom sheet / boutons.
 * - Images : lazy loading + gestion d'erreur (fallback) + placeholder low-fi.
 * - Feedback visuel & haptique : animation boutons, toasts accessibles, vibration courte si dispo.
 *
 * Dépendances : Aucune lib externe. Utilise TailwindCSS pour le style.
 */

/* ---------- Utilitaire : fallback image data URI (SVG minimal) ---------- */
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='320' viewBox='0 0 512 320'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='20'>Image indisponible</text></svg>`
  );

/* ---------- Petit helper haptique (si dispo) ---------- */
const vibrate = (pattern = 10) => {
  if (navigator && 'vibrate' in navigator) navigator.vibrate(pattern);
};

/* ---------- Composant principal ---------- */
export default function Commander() {
  /* ---------- États principaux ---------- */
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  /* bottom sheet (mobile) open state */
  const [cartOpen, setCartOpen] = useState(false);

  /* toast accessible */
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  /* ref pour le bottom sheet (pour focus management et keyboard events) */
  const sheetRef = useRef(null);

  /* ---------- Données du menu (inchangées, légèrement nettoyées) ---------- */
  const menuItems = [
    {
      id: 1,
      name: 'Romazava',
      description:
        'Le plat national malgache - viande de zébu mijotée avec brèdes',
      price: '18,000 Ar',
      image: '/images/romazava.jpeg',
      category: 'plats-principaux',
      preparationTime: '35-45 min',
      rating: 4.9,
      spiceLevel: 2,
      isPopular: true
    },
    {
      id: 2,
      name: 'Poulet coco',
      description:
        'Poulet mijoté dans une sauce coco crémeuse aux épices malgaches',
      price: '16,000 Ar',
      image: '/images/pouletcoco.jpg',
      category: 'plats-principaux',
      preparationTime: '30-40 min',
      rating: 4.8,
      spiceLevel: 1,
      isPopular: true
    },
    {
      id: 3,
      name: 'Brochettes de zébu',
      description: 'Brochettes de zébu mariné, servi avec sauce piquante maison',
      price: '8,000 Ar',
      image: '/images/brochettedezebu.jpg',
      category: 'entrees',
      preparationTime: '20-25 min',
      rating: 4.8,
      spiceLevel: 3,
      isPopular: true
    },
    {
      id: 4,
      name: 'Mofo anana',
      description: 'Beignets de brèdes, croustillants et savoureux',
      price: '6,000 Ar',
      image: '/images/mofoanana.jpg',
      category: 'vegetarien',
      preparationTime: '20-25 min',
      rating: 4.5,
      spiceLevel: 0,
      isVegetarian: true,
      isPopular: true
    },
    {
      id: 5,
      name: 'Koba',
      description: 'Gâteau de riz et cacahuètes enveloppé dans une feuille de bananier',
      price: '5,000 Ar',
      image: '/images/koba.webp',
      category: 'desserts',
      preparationTime: '5 min',
      rating: 4.7,
      spiceLevel: 0,
      isVegetarian: true,
      isPopular: true
    },
    {
      id: 6,
      name: 'Ravitoto',
      description: "Feuilles de manioc pilées avec porc, parfumées à l'ail et gingembre",
      price: '15,000 Ar',
      image: '/images/ravitoto.jpg',
      category: 'plats-principaux',
      preparationTime: '40-50 min',
      rating: 4.7,
      spiceLevel: 1
    },
    {
      id: 7,
      name: 'Sambos',
      description: 'Beignets fourrés à la viande hachée et légumes, croustillants',
      price: '6,000 Ar',
      image: '/images/sambos.jpg',
      category: 'entrees',
      preparationTime: '15-20 min',
      rating: 4.5,
      spiceLevel: 1
    },
    {
      id: 8,
      name: 'Lasary',
      description: 'Salade malgache de tomates, concombres, oignons et brèdes',
      price: '7,000 Ar',
      image: '/images/lasary.jpg',
      category: 'entrees',
      preparationTime: '10-15 min',
      rating: 4.4,
      spiceLevel: 0,
      isVegetarian: true
    },
    {
      id: 9,
      name: 'Mofo akondro',
      description: 'Beignets de banane douce, parfaits pour le goûter',
      price: '4,000 Ar',
      image: '/images/mofoakondro.jpg',
      category: 'desserts',
      preparationTime: '10-15 min',
      rating: 4.6,
      spiceLevel: 0,
      isVegetarian: true
    },
    {
      id: 10,
      name: 'Bonbon coco',
      description: 'Confiserie à base de noix de coco râpée et sucrée',
      price: '3,000 Ar',
      image: '/images/bonboncoco.jpg',
      category: 'desserts',
      preparationTime: '5 min',
      rating: 4.5,
      spiceLevel: 0,
      isVegetarian: true
    }
  ];

  const categories = [
    { id: 'tous', name: 'Tous les plats', icon: '🍽️' },
    { id: 'plats-principaux', name: 'Plats Principaux', icon: '🍛' },
    { id: 'entrees', name: 'Entrées', icon: '🥗' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'boissons', name: 'Boissons', icon: '🥤' },
    { id: 'vegetarien', name: 'Végétarien', icon: '🌱' }
  ];

  /* ---------- Chargement du panier (localStorage) ---------- */
  useEffect(() => {
    const savedCart = localStorage.getItem('e-kaly-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Erreur de chargement du panier', err);
      }
    }
  }, []);

  /* ---------- Helpers panier (add / remove / update) ---------- */
  const persistCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
    // feedback visuel + haptique
    setAccessibleToast('Panier mis à jour');
    vibrate(8);
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      const newItem = {
        ...item,
        cartId: Date.now() + Math.random(),
        quantity: 1,
        addedAt: new Date().toISOString()
      };
      updatedCart = [...cart, newItem];
    }

    persistCart(updatedCart);
    // Ouvrir le bottom sheet sur mobile lorsqu'on ajoute un item
    setCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter((item) => item.cartId !== cartId);
    persistCart(updatedCart);
  };

  const updateQuantity = (cartId, change) => {
    const updatedCart = cart.map((item) => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    persistCart(updatedCart);
  };

  /* ---------- Checkout (simulé) ---------- */
  const handleCheckout = () => {
    if (cart.length === 0) {
      setAccessibleToast("Votre panier est vide");
      return;
    }

    setLoading(true);
    vibrate(15);

    setTimeout(() => {
      const orderHistory = JSON.parse(localStorage.getItem('e-kaly-orders') || '[]');
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: calculateTotals().total,
        date: new Date().toISOString(),
        status: 'confirmed'
      };

      localStorage.setItem('e-kaly-orders', JSON.stringify([newOrder, ...orderHistory]));
      setCart([]);
      localStorage.removeItem('e-kaly-cart');
      setLoading(false);
      setShowOrderSuccess(true);
      setCartOpen(false);
      setAccessibleToast('Commande confirmée !');
      vibrate([20, 10, 20]);

      setTimeout(() => setShowOrderSuccess(false), 4000);
    }, 1200);
  };

  /* ---------- Totaux ---------- */
  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => {
      const priceString = (item.price || '').replace(/[^0-9]/g, '');
      const price = parseInt(priceString) || 0;
      return sum + price * item.quantity;
    }, 0);

    const deliveryFee = cart.length > 0 ? 2000 : 0;
    const serviceFee = Math.round(subtotal * 0.05);
    const tax = Math.round(subtotal * 0.10);
    const total = subtotal + deliveryFee + serviceFee + tax;

    return { subtotal, deliveryFee, serviceFee, tax, total };
  };

  /* ---------- Filtrage ---------- */
  const filteredItems = menuItems.filter(
    (item) =>
      (activeCategory === 'tous' || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totals = calculateTotals();

  /* ---------- Toast accessible ---------- */
  const setAccessibleToast = (message) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  /* ---------- Keyboard / focus management pour le bottom sheet ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && cartOpen) {
        setCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen]);

  useEffect(() => {
    if (cartOpen && sheetRef.current) {
      // focus sur le contenu du sheet pour accessibilité
      sheetRef.current.focus();
    }
  }, [cartOpen]);

  /* ---------- Swipe to close (simple) pour mobile bottom sheet ---------- */
  useEffect(() => {
    const el = sheetRef.current;
    if (!el) return;

    let startY = 0;
    let currentY = 0;
    let touching = false;

    const onTouchStart = (e) => {
      touching = true;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
    };
    const onTouchMove = (e) => {
      if (!touching) return;
      currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const diff = currentY - startY;
      if (diff > 0 && diff < 300) {
        el.style.transform = `translateY(${diff}px)`;
      }
    };
    const onTouchEnd = () => {
      touching = false;
      const diff = currentY - startY;
      el.style.transform = '';
      if (diff > 120) {
        setCartOpen(false);
      }
      startY = currentY = 0;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [sheetRef.current]);

  /* ---------- UI ---------- */
  return (
    <div className="antialiased text-gray-900 w-[100vw] min-h-screen bg-gray-50">
      {/* Header simplifié - accessible */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <Header />
      </header>

      {/* Notification de succès (aria-live pour lecteurs d'écran) */}
      <div
        aria-live="polite"
        className="fixed inset-x-0 z-40 flex justify-center pointer-events-none top-16"
      >
        {showOrderSuccess && (
          <div
            role="status"
            className="inline-flex items-center gap-3 px-5 py-3 text-white bg-green-500 shadow-lg pointer-events-auto rounded-2xl animate-fade-in"
          >
            <span aria-hidden>🎉</span>
            <div className="text-sm font-semibold">Commande confirmée !</div>
          </div>
        )}
      </div>

      {/* Toast accessible (aria-live) */}
      <div
        aria-live="assertive"
        className="fixed z-50 left-4 bottom-4"
        aria-atomic="true"
      >
        {toast && (
          <div
            role="status"
            className="px-4 py-2 text-sm text-white rounded-md shadow-md bg-black/80"
          >
            {toast}
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <main className="px-4 pt-20 pb-40 ">
        {/* Recherche */}
        <div className="max-w-xl mx-auto mb-6">
          <label htmlFor="search" className="sr-only">
            Rechercher un plat
          </label>
          <div className="relative">
            <input
              id="search"
              aria-label="Rechercher un plat"
              type="search"
              placeholder="Rechercher un plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 text-sm bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="absolute text-gray-400 -translate-y-1/2 pointer-events-none left-3 top-1/2">
              🔍
            </div>
          </div>
        </div>

        {/* Catégories (scrollable horizontal on mobile) */}
        <nav
          aria-label="Catégories de plats"
          className="mb-6 overflow-x-auto"
        >
          <ul className="flex gap-2 px-1">
            {categories.map((category) => {
              const active = activeCategory === category.id;
              return (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(category.id);
                      vibrate(6);
                      setAccessibleToast(`${category.name} sélectionnée`);
                    }}
                    aria-pressed={active}
                    className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition transform ${
                      active
                        ? 'bg-yellow-400 text-black shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                  >
                    <span aria-hidden>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
          <div className="p-3 text-center bg-white shadow-sm rounded-2xl">
            <div className="text-xl font-bold text-yellow-600">{menuItems.length}</div>
            <div className="text-xs text-gray-500">Plats</div>
          </div>
          <div className="p-3 text-center bg-white shadow-sm rounded-2xl">
            <div className="text-xl font-bold">4.8</div>
            <div className="text-xs text-gray-500">Note moyenne</div>
          </div>
          <div className="p-3 text-center bg-white shadow-sm rounded-2xl">
            <div className="text-xl font-bold">30-45min</div>
            <div className="text-xs text-gray-500">Livraison</div>
          </div>
          <div className="p-3 text-center bg-white shadow-sm rounded-2xl">
            <div className="text-xl font-bold">{cart.length}</div>
            <div className="text-xs text-gray-500">Articles</div>
          </div>
        </div>

        {/* Grid des plats (mobile-first) */}
        {filteredItems.length === 0 ? (
          <section aria-live="polite" className="py-10 text-center">
            <div className="mb-4 text-6xl">🍽️</div>
            <h2 className="mb-1 text-xl font-bold">Aucun plat trouvé</h2>
            <p className="text-sm text-gray-500">Essayez d'élargir votre recherche.</p>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                role="article"
                aria-label={`${item.name} — ${item.description}`}
                className="overflow-hidden transition transform bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image : lazy + gestion d'erreur */}
                <div className="relative w-full bg-gray-100 h-44">
                  <img
                    loading="lazy" /* lazy loading natif */
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_SVG;
                    }}
                    className="object-cover w-full h-full"
                    width="640"
                    height="360"
                  />
                  {item.isPopular && (
                    <span className="absolute px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full top-3 left-3">
                      POPULAIRE
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="absolute px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full top-3 right-3">
                      VÉGÉ
                    </span>
                  )}
                </div>

                {/* Corps de la carte */}
                <div className="flex flex-col gap-3 p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-md">{item.name}</h3>
                    <div className="text-sm font-extrabold text-yellow-600">{item.price}</div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <span>⏱ {item.preparationTime}</span>
                      <span>•</span>
                      <span>⭐ {item.rating}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.spiceLevel > 0 &&
                        Array.from({ length: item.spiceLevel }).map((_, i) => (
                          <span key={i} className="text-xs" aria-hidden>
                            🌶️
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Bouton ajouter : feedback visuel + accessible */}
                  <div className="mt-1">
                    <button
                      onClick={() => addToCart(item)}
                      aria-label={`Ajouter ${item.name} au panier`}
                      className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold bg-yellow-400 text-black shadow hover:scale-[1.02] active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                    >
                      <span aria-hidden>＋</span> Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* ---------- Bottom sheet : mobile cart (priority #1) ---------- */}
      {/* - Sur mobile (sm : screens), on affiche un bottom sheet overlay. Sur desktop, on montre un aside sticky. */}
      <div>
        {/* Overlay when sheet open */}
        <div
          aria-hidden={!cartOpen}
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
            cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setCartOpen(false)}
        />

        {/* Bottom sheet container */}
        <aside
          ref={sheetRef}
          role="dialog"
          aria-label="Panier"
          aria-modal="true"
          tabIndex={-1}
          className={`fixed z-50 left-0 right-0 bottom-0 transform transition-all duration-300 ${cartOpen ? 'translate-y-0' : 'translate-y-full'} sm:hidden`}
        >
          <div className="mx-4 mb-4 overflow-hidden bg-white shadow-xl rounded-t-2xl">
            {/* Handle */}
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-yellow-100 rounded-lg w-9 h-9">
                  🛒
                </div>
                <div>
                  <div className="text-sm font-bold">Votre panier</div>
                  <div className="text-xs text-gray-500">{cart.length} article(s)</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-label="Fermer le panier"
                  onClick={() => setCartOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Contenu du panier */}
            <div className="max-h-[55vh] overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="mb-2 text-4xl">🛒</div>
                  <div className="font-semibold">Votre panier est vide</div>
                  <div className="text-sm text-gray-500">Ajoutez des plats depuis le menu</div>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50"
                  >
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_SVG;
                      }}
                      className="flex-shrink-0 object-cover w-16 h-16 rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold truncate">{item.name}</h4>
                        <div className="text-sm font-bold text-yellow-600">{item.price}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          aria-label={`Réduire la quantité de ${item.name}`}
                          onClick={() => updateQuantity(item.cartId, -1)}
                          className="flex items-center justify-center w-8 h-8 bg-white border rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                          −
                        </button>
                        <div className="w-8 font-semibold text-center">{item.quantity}</div>
                        <button
                          aria-label={`Augmenter la quantité de ${item.name}`}
                          onClick={() => updateQuantity(item.cartId, 1)}
                          className="flex items-center justify-center w-8 h-8 bg-white border rounded-full hover:bg-gray-100 focus:outline-none"
                        >
                          +
                        </button>

                        <button
                          aria-label={`Supprimer ${item.name} du panier`}
                          onClick={() => removeFromCart(item.cartId)}
                          className="ml-auto text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totaux & commande */}
            <div className="p-4 border-t border-gray-100">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span className="font-semibold">{totals.subtotal.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Livraison</span>
                  <span className="font-semibold">{totals.deliveryFee.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA</span>
                  <span className="font-semibold">{totals.tax.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{totals.total.toLocaleString()} Ar</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                aria-disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-white transition transform ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-95'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {loading ? 'Traitement...' : 'Commander maintenant'}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------- Desktop aside sticky (visible à partir de sm/md) ---------- */}
      <aside className="fixed z-40 hidden sm:block right-6 top-24 w-80">
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
          <div className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">Votre Panier</div>
                <div className="text-xs text-gray-800">{cart.length} article(s)</div>
              </div>
              <button
                aria-label="Ouvrir le panier"
                onClick={() => {
                  // focus sur le bottom sheet (pour cohérence), mais ici on scroll vers l'aside
                  setAccessibleToast('Panier ouvert');
                  vibrate(6);
                }}
                className="p-2 rounded-md hover:bg-white/30"
              >
                🛒
              </button>
            </div>
          </div>

          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <div className="py-8 text-center">
                <div className="text-3xl">🛒</div>
                <div className="font-semibold">Panier vide</div>
                <div className="text-xs text-gray-500">Ajoutez des plats</div>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg bg-gray-50">
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_SVG;
                    }}
                    className="flex-shrink-0 object-cover w-12 h-12 rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      <div className="text-sm font-bold text-yellow-600">{item.price}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        aria-label={`Réduire ${item.name}`}
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="flex items-center justify-center bg-white border rounded-full w-7 h-7 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <div className="font-semibold text-center w-7">{item.quantity}</div>
                      <button
                        aria-label={`Augmenter ${item.name}`}
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="flex items-center justify-center bg-white border rounded-full w-7 h-7 hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        aria-label={`Supprimer ${item.name}`}
                        onClick={() => removeFromCart(item.cartId)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-100">
              <div className="mb-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold">{totals.subtotal.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="font-semibold">{totals.deliveryFee.toLocaleString()} Ar</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-bold text-green-600">{totals.total.toLocaleString()} Ar</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                aria-disabled={loading}
                className={`w-full py-2 rounded-lg font-bold text-white ${
                  loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 active:scale-95'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform`}
              >
                {loading ? 'Traitement...' : 'Commander maintenant'}
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

/**
 * NOTES / EXPLICATIONS FR (récapitulatif des corrections demandées) :
 *
 * 1) Mobile cart covering entire screen -> bottom sheet :
 *    - Le panier mobile est implémenté comme un aside fixé en bas (bottom sheet).
 *    - Un overlay semi-transparent apparaît derrière; toucher l'overlay ferme le sheet.
 *    - Ajout d'un simple "swipe-to-close" : glisser vers le bas ferme le sheet.
 *
 * 2) Accessibilité (aria, role, tabIndex) :
 *    - role="dialog", aria-modal, aria-label sur le bottom sheet.
 *    - aria-live pour messages/toasts et notification de succès.
 *    - aria-pressed sur catégories, aria-disabled sur boutons désactivés.
 *    - focus management : focus sur le sheet quand il s'ouvre, Esc pour fermer.
 *
 * 3) Image lazy loading + error handling :
 *    - Utilisation de loading="lazy" (support natif) et onError qui remplace par FALLBACK_SVG.
 *    - Dimensions renseignées pour aider le navigateur.
 *
 * 4) Feedback visuel & haptique :
 *    - Animations Tailwind : hover/active/scale pour les boutons.
 *    - Toasts accessibles (aria-live) pour retours utilisateurs.
 *    - Vibration courte via navigator.vibrate si disponible.
 *
 * Remarque Tailwind (à ajouter dans ta config si nécessaire) :
 * - Assure-toi d'activer le plugin line-clamp si tu veux cacher les descriptions : `@tailwindcss/line-clamp`
 * - Breakpoints standards suffisent (sm/md/lg) ; le bottom sheet est caché à partir de `sm` (sm:hidden).
 *
 * Fin.
 */
