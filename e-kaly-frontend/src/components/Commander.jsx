 import React, { useState, useEffect } from 'react';

export default function Commander() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState('');

  // 🎯 DEBUG: Affiche l'état actuel
  useEffect(() => {
    setDebug(`Cart: ${cart.length} items, Loading: ${loading}, Error: ${error}`);
    console.log('🛒 État du panier:', cart);
    console.log('⚡ État loading:', loading);
  }, [cart, loading, error]);

  // 🎯 CHARGEMENT DU PANIER
  useEffect(() => {
    console.log('🔍 Chargement du panier depuis localStorage...');
    const savedCart = localStorage.getItem('e-kaly-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log('📦 Panier chargé:', parsedCart);
        setCart(parsedCart);
      } catch (err) {
        console.error('❌ Erreur parsing panier:', err);
        setError('Erreur de chargement du panier');
      }
    }
  }, []);

  // 🛒 AJOUTER AU PANIER (Version debugguée)
  const addToCart = (item) => {
    console.log('➕ Ajout au panier:', item);
    
    // Créer un nouvel item avec ID unique
    const newItem = {
      ...item,
      cartId: Date.now() + Math.random(), // ID vraiment unique
      quantity: 1,
      addedAt: new Date().toISOString()
    };

    console.log('🆕 Nouvel item:', newItem);

    // Mettre à jour le state
    const updatedCart = [...cart, newItem];
    console.log('📋 Nouveau panier:', updatedCart);
    
    setCart(updatedCart);
    
    // Sauvegarder dans localStorage
    try {
      localStorage.setItem('e-kaly-cart', JSON.stringify(updatedCart));
      console.log('💾 Panier sauvegardé dans localStorage');
    } catch (err) {
      console.error('❌ Erreur sauvegarde:', err);
      setError('Erreur de sauvegarde');
    }
  };

  // 🗑️ SUPPRIMER DU PANIER
  const removeFromCart = (cartId) => {
    console.log('🗑️ Suppression item:', cartId);
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

  // 💳 COMMANDE - Version simplifiée et debugguée
  const handleCheckout = () => {
    console.log('🚀 Début de la commande...');
    console.log('📦 Panier actuel:', cart);
    
    if (cart.length === 0) {
      console.log('❌ Panier vide - commande annulée');
      setError('Votre panier est vide');
      return;
    }

    setLoading(true);
    console.log('⚡ Loading activé');

    // Simuler un délai de traitement
    setTimeout(() => {
      console.log('✅ Commande traitée');
      
      // Sauvegarder l'historique
      const orderHistory = JSON.parse(localStorage.getItem('e-kaly-orders') || '[]');
      const newOrder = {
        id: Date.now(),
        items: cart,
        total: calculateTotals().total,
        date: new Date().toISOString(),
        status: 'confirmed'
      };
      
      localStorage.setItem('e-kaly-orders', JSON.stringify([newOrder, ...orderHistory]));
      console.log('📝 Commande sauvegardée:', newOrder);

      // Vider le panier
      setCart([]);
      localStorage.removeItem('e-kaly-cart');
      
      setLoading(false);
      console.log('⚡ Loading désactivé');
      
      // Message de succès
      alert(`🎉 Commande confirmée !\nTotal: ${calculateTotals().total.toLocaleString()} Ar`);
      
    }, 2000);
  };

  // 🧮 CALCUL DES TOTAUX
  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => {
      // Nettoyer le prix : "16,000 Ar" → 16000
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

  const totals = calculateTotals();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Debug Info - À enlever en production */}
      <div className="fixed top-20 right-4 bg-yellow-100 p-2 rounded text-xs z-50">
        <div>Debug: {debug}</div>
        <div>Cart length: {cart.length}</div>
      </div>

      {/* En-tête */}
      <div className="w-full bg-white shadow-sm border-b">
        <div className="w-full px-4 py-6 mx-auto lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">e-Kaly</h1>
              <p className="mt-2 text-gray-600">Cuisine Malgache Authentique • 🚗 Livraison 30-45min</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="flex items-center text-yellow-600">⭐ 4.8 (247 avis)</span>
              <span className="text-gray-500">•</span>
              <span>💰 15,000 Ar minimum</span>
              <span className="text-gray-500">•</span>
              <span>📦 2,000 Ar de livraison</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="w-full px-4 py-3 mx-auto bg-red-100 border border-red-400 text-red-700 lg:px-8">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full">
        <div className="flex flex-col w-full gap-8 p-4 lg:flex-row lg:px-8">
          
          {/* Menu Principal */}
          <div className="flex-1">
            {menuSections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="pb-3 mb-6 text-3xl font-bold text-gray-900 border-b">
                  {section.title}
                </h2>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {section.items.map(item => (
                    <div 
                      key={item.id} 
                      className="flex gap-6 p-6 transition-all bg-white rounded-xl shadow-sm hover:shadow-lg"
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="object-cover w-32 h-32 rounded-lg"
                          onError={(e) => {
                            console.error('❌ Image non trouvée:', item.image);
                            e.target.src = '/images/placeholder-food.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-xl font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mb-4 text-gray-600">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-yellow-600">
                            {item.price}
                          </span>
                          <button 
                            onClick={() => {
                              console.log('🎯 Clic sur ajouter:', item.name);
                              addToCart(item);
                            }}
                            className="px-6 py-3 font-semibold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                          >
                            Ajouter au panier
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Panier Latéral */}
          <div className="w-full lg:w-96 xl:w-[420px]">
            <div className="sticky p-6 bg-white rounded-xl shadow-lg top-24">
              <h2 className="mb-6 text-2xl font-bold">Votre commande</h2>
              
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-500">Votre panier est vide</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Ajoutez des plats délicieux !
                  </p>
                </div>
              ) : (
                <div className="mb-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartId} className="py-3 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-2 text-red-500 transition-colors rounded-full hover:bg-red-50"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Détails des coûts */}
              {cart.length > 0 && (
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">
                      {totals.subtotal.toLocaleString()} Ar
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-semibold">
                      {totals.deliveryFee.toLocaleString()} Ar
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais de service</span>
                    <span className="font-semibold">
                      {totals.serviceFee.toLocaleString()} Ar
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">TVA</span>
                    <span className="font-semibold">
                      {totals.tax.toLocaleString()} Ar
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 text-xl font-bold border-t">
                    <span>Total</span>
                    <span className="text-green-600">
                      {totals.total.toLocaleString()} Ar
                    </span>
                  </div>
                </div>
              )}

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0 || loading}
                className={`w-full py-4 text-lg font-bold rounded-lg mt-6 transition-all ${
                  cart.length === 0 || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </span>
                ) : cart.length === 0 ? (
                  'Panier vide'
                ) : (
                  `Commander • ${totals.total.toLocaleString()} Ar`
                )}
              </button>

              {cart.length > 0 && !loading && (
                <p className="mt-4 text-sm text-center text-gray-500">
                  🚀 Livraison estimée : 30-45 minutes
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Données du menu
const menuSections = [
  {
    title: "Plats Malgaches",
    items: [
      {
        id: 1,
        name: "Romazava Spécial",
        description: "Notre romazava signature avec viande de zébu et brèdes fraîches",
        price: "16,000 Ar",
        image: "/images/romazava.jpeg"
      },
      {
        id: 2,
        name: "Ravitoto sy Henakisoa", 
        description: "Ravitoto pilé avec porc, servi avec du riz",
        price: "14,000 Ar",
        image: "/images/ravitoto.jpg"
      }
    ]
  }
];