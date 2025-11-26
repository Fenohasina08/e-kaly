 import React, { useState, useEffect } from 'react';

export default function Commander() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // 🎯 CHARGEMENT DU PANIER
  useEffect(() => {
    const savedCart = localStorage.getItem('e-kaly-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (err) {
        setError('Erreur de chargement du panier');
      }
    }
  }, []);

  // 🛒 AJOUTER AU PANIER
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
      localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
    } else {
      const newItem = {
        ...item,
        cartId: Date.now() + Math.random(),
        quantity: 1,
        addedAt: new Date().toISOString()
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
    }
  };

  // 🗑️ SUPPRIMER DU PANIER
  const removeFromCart = (cartId) => {
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    setCart(updatedCart);
    localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
  };

  // 🔢 MODIFIER QUANTITÉ
  const updateQuantity = (cartId, change) => {
    const updatedCart = cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
  };

  // 💳 COMMANDE
  const handleCheckout = () => {
    if (cart.length === 0) {
      setError('Votre panier est vide');
      return;
    }

    setLoading(true);

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
      
      setTimeout(() => setShowOrderSuccess(false), 5000);
    }, 2000);
  };

  // 🧮 CALCUL DES TOTAUX
  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => {
      const priceString = item.price.replace(/[^0-9]/g, '');
      const price = parseInt(priceString) || 0;
      return sum + (price * item.quantity);
    }, 0);

    const deliveryFee = 2000;
    const serviceFee = Math.round(subtotal * 0.05);
    const tax = Math.round(subtotal * 0.10);
    const total = subtotal + deliveryFee + serviceFee + tax;

    return { subtotal, deliveryFee, serviceFee, tax, total };
  };

  // 🔍 FILTRES
  const filteredMenuSections = menuSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      (activeCategory === 'tous' || item.category === activeCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  const totals = calculateTotals();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Notification de succès */}
      {showOrderSuccess && (
        <div className="fixed z-50 flex items-center gap-3 px-6 py-4 text-white transform -translate-x-1/2 bg-green-500 shadow-2xl top-20 left-1/2 rounded-2xl animate-bounce">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold">Commande confirmée !</p>
            <p className="text-sm opacity-90">Votre repas arrive bientôt</p>
          </div>
        </div>
      )}

      {/* En-tête amélioré */}
      <div className="shadow-lg bo5rder-b w-[100vw] bg-white/95 backdrop-blur-sm">
        <div className="w-full px-4 py-8 mx-auto lg:px-8">
          <div className="flex flex-col items-center mb-8 text-center">
            <h1 className="text-4xl font-bold text-transparent text-gray-900 lg:text-5xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
              e-Kaly
            </h1>
            <p className="max-w-2xl mt-4 text-xl text-gray-600">
              Découvrez l'authenticité des saveurs malgaches 🍽️
            </p>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col items-center justify-between max-w-6xl gap-4 mx-auto lg:flex-row">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder=" Rechercher un plat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-black border border-gray-300 shadow-sm lg text-bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <div className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2">
                  🔍
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    activeCategory === category.id
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats en temps réel */}
      <div className="w-full px-4 py-6">
        <div className="grid max-w-6xl grid-cols-2 gap-4 mx-auto text-center md:grid-cols-4">
          <div className="p-4 shadow-sm bg-white/80 backdrop-blur rounded-2xl">
            <div className="text-2xl font-bold text-yellow-600">{menuSections.flatMap(s => s.items).length}</div>
            <div className="text-sm text-gray-600">Plats disponibles</div>
          </div>
          <div className="p-4 shadow-sm bg-white/80 backdrop-blur rounded-2xl">
            <div className="text-2xl font-bold text-green-600">4.8</div>
            <div className="text-sm text-gray-600">⭐ Note moyenne</div>
          </div>
          <div className="p-4 shadow-sm bg-white/80 backdrop-blur rounded-2xl">
            <div className="text-2xl font-bold text-blue-600">30-45min</div>
            <div className="text-sm text-gray-600">🚗 Livraison</div>
          </div>
          <div className="p-4 shadow-sm bg-white/80 backdrop-blur rounded-2xl">
            <div className="text-2xl font-bold text-purple-600">{cart.length}</div>
            <div className="text-sm text-gray-600">🛒 Votre panier</div>
          </div>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="w-full max-w-6xl px-4 py-3 mx-auto text-red-700 bg-red-100 border border-red-400 lg:px-8 rounded-xl">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-lg font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="w-full px-4 py-8">
        <div className="flex flex-col gap-8 mx-auto max-w-7xl lg:flex-row">
          
          {/* Menu Principal */}
          <div className="flex-1">
            {filteredMenuSections.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🍽️</div>
                <h3 className="mb-2 text-2xl font-bold text-gray-700">Aucun plat trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              filteredMenuSections.map((section, index) => (
                <div key={index} className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-yellow-500 rounded-2xl">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {section.items.map(item => (
                      <div 
                        key={item.id} 
                        className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg group rounded-3xl hover:shadow-2xl hover:-translate-y-2"
                      >
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDMyMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGOEY2Ii8+CjxwYXRoIGQ9Ik0xNjAgOTZDMTc0LjM1OSA5NiAxODYgODQuMzU5IDExODYgNzBDMTg2IDU1LjY0MSAxNzQuMzU5IDQ0IDE2MCA0NEMxNDUuNjQxIDQ0IDEzNCA1NS42NDEgMTM0IDcwQzEzNCA4NC4zNTkgMTQ1LjY0MSA5NiAxNjAgOTZaIiBmaWxsPSIjREE5RTlBIi8+CjxjaXJjbGUgY3g9IjE2MCIgY3k9IjcwIiByPSIyMCIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K';
                            }}
                          />
                          {item.isPopular && (
                            <div className="absolute px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full top-3 left-3">
                              POPULAIRE 🔥
                            </div>
                          )}
                          {item.isVegetarian && (
                            <div className="absolute px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full top-3 right-3">
                              VÉGÉ 🌱
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="flex-1 pr-4 text-xl font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="text-2xl font-bold text-yellow-600 whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                          
                          <p className="mb-4 leading-relaxed text-gray-600">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>⏱️ {item.preparationTime}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                ⭐ {item.rating}
                              </span>
                            </div>
                            {item.spiceLevel > 0 && (
                              <div className="flex items-center gap-1">
                                {[...Array(item.spiceLevel)].map((_, i) => (
                                  <span key={i} className="text-red-500">🌶️</span>
                                ))}
                              </div>
                            )}
                          </div>

                          <button 
                            onClick={() => addToCart(item)}
                            className="w-full py-4 text-lg font-bold text-white transition-all transform shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:from-yellow-600 hover:to-orange-600 hover:scale-105 hover:shadow-xl"
                          >
                            + Ajouter au panier
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Panier Latéral Amélioré */}
          <div className="w-full lg:w-96 xl:w-[450px]">
            <div className="sticky overflow-hidden border border-gray-100 shadow-2xl top-24 bg-white/95 backdrop-blur-sm rounded-3xl">
              <div className="p-6 text-white bg-gradient-to-r from-yellow-500 to-orange-500">
                <h2 className="text-2xl font-bold">Votre commande</h2>
                <p className="opacity-90">Prêt à savourer ?</p>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mb-4 text-6xl">🛒</div>
                    <p className="text-lg font-medium text-gray-500">Votre panier est vide</p>
                    <p className="mt-2 text-gray-400">Explorez notre menu et ajoutez vos plats préférés</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.cartId} className="p-4 border border-gray-200 bg-gray-50 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="font-semibold text-yellow-600">{item.price}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors bg-red-100 rounded-full hover:bg-red-200"
                          >
                            ✕
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 px-3 py-1 bg-white border rounded-full">
                            <button 
                              onClick={() => updateQuantity(item.cartId, -1)}
                              className="flex items-center justify-center w-6 h-6 text-gray-600 transition-colors hover:text-yellow-600"
                            >
                              −
                            </button>
                            <span className="font-bold text-center text-gray-900 min-w-8">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="flex items-center justify-center w-6 h-6 text-gray-600 transition-colors hover:text-yellow-600"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-gray-900">
                            {(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity).toLocaleString()} Ar
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Détails des coûts */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-semibold">{totals.subtotal.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-semibold">{totals.deliveryFee.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Frais de service</span>
                      <span className="font-semibold">{totals.serviceFee.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">TVA</span>
                      <span className="font-semibold">{totals.tax.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between pt-4 text-2xl font-bold border-t border-gray-300">
                      <span>Total</span>
                      <span className="text-green-600">{totals.total.toLocaleString()} Ar</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0 || loading}
                    className={`w-full py-5 text-xl font-bold rounded-2xl mt-6 transition-all ${
                      cart.length === 0 || loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <div className="w-6 h-6 mr-3 border-b-2 border-white rounded-full animate-spin"></div>
                        Traitement en cours...
                      </span>
                    ) : (
                      `🎉 Commander • ${totals.total.toLocaleString()} Ar`
                    )}
                  </button>

                  {cart.length > 0 && !loading && (
                    <div className="mt-4 space-y-2 text-center">
                      <p className="text-sm text-gray-500">
                        🚀 Livraison estimée : 30-45 minutes
                      </p>
                      <p className="text-xs text-gray-400">
                        ✅ Paiement sécurisé • 📞 Support 24/7
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🍽️ DONNÉES ENRICHIES DU MENU
const categories = [
  { id: 'tous', name: 'Tous les plats', icon: '🍽️' },
  { id: 'plats-principaux', name: 'Plats Principaux', icon: '🍛' },
  { id: 'entrees', name: 'Entrées', icon: '🥗' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'boissons', name: 'Boissons', icon: '🥤' },
  { id: 'vegetarien', name: 'Végétarien', icon: '🌱' }
];

const menuSections = [
  {
    title: "Plats Principaux Malgaches",
    description: "Les incontournables de la cuisine traditionnelle",
    icon: "🍛",
    items: [
      {
        id: 1,
        name: "Romazava Royal",
        description: "Le plat national malgache - viande de zébu mijotée avec brèdes, tomates et oignons",
        price: "18,000 Ar",
        image: "/images/romazava.jpeg",
        category: "plats-principaux",
        preparationTime: "35-45 min",
        rating: 4.9,
        spiceLevel: 2,
        isPopular: true,
        calories: 450
      },
      {
        id: 2,
        name: "Ravitoto sy Henakisoa",
        description: "Feuilles de manioc pilées avec porc, parfumées à l'ail et au gingembre",
        price: "15,000 Ar",
        image: "/images/ravitoto.jpg",
        category: "plats-principaux",
        preparationTime: "40-50 min",
        rating: 4.7,
        spiceLevel: 1,
        isPopular: true,
        calories: 520
      },
      {
        id: 3,
        name: "Poulet au Coco Maison",
        description: "Poulet mijoté dans une sauce coco crémeuse avec épices malgaches",
        price: "16,000 Ar",
        image: "/images/pouletcoco.jpg",
        category: "plats-principaux",
        preparationTime: "30-40 min",
        rating: 4.8,
        spiceLevel: 1,
        calories: 480
      },
      {
        id: 4,
        name: "Varanga sy Trondro",
        description: "Riz cantonais malgache avec crevettes et légumes frais",
        price: "14,000 Ar",
        image: "/images/varanga.jpg",
        category: "plats-principaux",
        preparationTime: "25-35 min",
        rating: 4.6,
        spiceLevel: 0,
        calories: 420
      },
      {
        id: 5,
        name: "Soupe Chinoise Malgache",
        description: "Nouilles fraîches dans un bouillon parfumé avec légumes et viande au choix",
        price: "12,000 Ar",
        image: "/images/soupe-chinoise.jpg",
        category: "plats-principaux",
        preparationTime: "20-25 min",
        rating: 4.5,
        spiceLevel: 1,
        calories: 380
      }
    ]
  },
  {
    title: "Street Food & Entrées",
    description: "Pour commencer en beauté",
    icon: "🍢",
    items: [
      {
        id: 6,
        name: "Brochettes de Zébu",
        description: "3 brochettes de zébu mariné, servi avec sauce piquante maison et achards",
        price: "8,000 Ar",
        image: "/images/brochettedezebu.jpg",
        category: "entrees",
        preparationTime: "20-25 min",
        rating: 4.8,
        spiceLevel: 3,
        isPopular: true,
        calories: 320
      },
      {
        id: 7,
        name: "Sambos Malgaches",
        description: "Beignets fourrés au viande hachée et légumes, croustillants à l'extérieur",
        price: "6,000 Ar",
        image: "/images/sambos.jpg",
        category: "entrees",
        preparationTime: "15-20 min",
        rating: 4.5,
        spiceLevel: 1,
        calories: 280
      },
      {
        id: 8,
        name: "Salade Malgache",
        description: "Mélange frais de tomates, concombres, oignons et brèdes avec vinaigrette citron",
        price: "7,000 Ar",
        image: "/images/lasary.jpg",
        category: "entrees",
        preparationTime: "10-15 min",
        rating: 4.4,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 150
      },
      {
        id: 9,
        name: "Akoho sy Voanio",
        description: "Petites brochettes de poulet mariné au coco et épices",
        price: "9,000 Ar",
        image: "/images/akoho-voanio.jpg",
        category: "entrees",
        preparationTime: "18-22 min",
        rating: 4.6,
        spiceLevel: 1,
        calories: 290
      }
    ]
  },
  {
    title: "Desserts Traditionnels",
    description: "Douceurs sucrées pour terminer le repas",
    icon: "🍮",
    items: [
      {
        id: 10,
        name: "Koba Ravina",
        description: "Gâteau de riz et cacahuètes enveloppé dans une feuille de bananier",
        price: "5,000 Ar",
        image: "/images/koba.webp",
        category: "desserts",
        preparationTime: "5 min",
        rating: 4.7,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 380
      },
      {
        id: 11,
        name: "Mofo Akondro",
        description: "Beignets de banane douce, parfaits pour le goûter",
        price: "4,000 Ar",
        image: "/images/mofoakondro.jpg",
        category: "desserts",
        preparationTime: "10-15 min",
        rating: 4.6,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 320
      },
      {
        id: 12,
        name: "Bonbon Coco",
        description: "Confiserie à base de noix de coco râpée et sucrée, fondante en bouche",
        price: "3,000 Ar",
        image: "/images/bonboncoco.jpg",
        category: "desserts",
        preparationTime: "5 min",
        rating: 4.5,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 250
      },
      {
        id: 13,
        name: "Mofo Gasy",
        description: "Pain malgache traditionnel, moelleux et parfumé",
        price: "2,500 Ar",
        image: "/images/mofogasy.jpg",
        category: "desserts",
        preparationTime: "5 min",
        rating: 4.3,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 180
      }
    ]
  },
  {
    title: "Boissons Rafraîchissantes",
    description: "Pour accompagner votre repas",
    icon: "🥤",
    items: [
      {
        id: 14,
        name: "Jus de Fruit Frais",
        description: "Au choix : ananas, mangue, corossol ou tamarin",
        price: "4,000 Ar",
        image: "/images/jus-frais.jpg",
        category: "boissons",
        preparationTime: "5 min",
        rating: 4.8,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 120
      },
      {
        id: 15,
        name: "Thé Rouge Malgache",
        description: "Thé nature ou vanille, issu des hautes terres",
        price: "3,000 Ar",
        image: "/images/the-rouge.jpg",
        category: "boissons",
        preparationTime: "5 min",
        rating: 4.6,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 5
      },
      {
        id: 16,
        name: "Litchi Juice",
        description: "Jus de litchi frais, sucré naturellement",
        price: "5,000 Ar",
        image: "/images/litchi-juice.jpg",
        category: "boissons",
        preparationTime: "5 min",
        rating: 4.7,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 140
      },
      {
        id: 17,
        name: "Cocktail Tropical",
        description: "Mélange de fruits de saison avec une touche de menthe",
        price: "6,000 Ar",
        image: "/images/cocktail-tropical.jpg",
        category: "boissons",
        preparationTime: "8 min",
        rating: 4.9,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 160
      }
    ]
  },
  {
    title: "Plats Végétariens",
    description: "Saveurs végétales authentiques",
    icon: "🌱",
    items: [
      {
        id: 18,
        name: "Romazava Végétarien",
        description: "Version végétale avec brèdes, tomates et aubergines",
        price: "12,000 Ar",
        image: "/images/romazava-vege.jpg",
        category: "vegetarien",
        preparationTime: "30-40 min",
        rating: 4.6,
        spiceLevel: 1,
        isVegetarian: true,
        calories: 280
      },
      {
        id: 19,
        name: "Mofo Anana",
        description: "Beignets de brèdes, croustillants et savoureux",
        price: "6,000 Ar",
        image: "/images/mofoanana.jpg",
        category: "vegetarien",
        preparationTime: "20-25 min",
        rating: 4.5,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 220
      },
      {
        id: 20,
        name: "Lasary Voatabia",
        description: "Salade de tomates fraîches aux oignons et vinaigrette citron",
        price: "5,000 Ar",
        image: "/images/lasary-voatabia.jpg",
        category: "vegetarien",
        preparationTime: "10 min",
        rating: 4.4,
        spiceLevel: 0,
        isVegetarian: true,
        calories: 80
      }
    ]
  }
];