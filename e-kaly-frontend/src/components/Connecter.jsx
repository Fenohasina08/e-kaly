import React, { useState } from 'react';

const  Connecter = () =>  {
  // State pour stocker l'email et le mot de passe saisis
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State pour afficher un message d'erreur si besoin
  const [error, setError] = useState('');

  // Fonction appelée au submit du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Simple validation basique
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Ici tu peux ajouter la logique pour appeler ton API de connexion
    // Par exemple fetch('http://localhost:3001/api/login', { ... })

    // Réinitialisation de l'erreur si tout est ok
    setError('');
    alert(`Connexion réussie pour ${email} !`);
  };
  const verifyEmail = (e) => {
    e.preventDefault();
    //si le email est different de ceux qui est dans la base de données donc afficher alert vous n'etes pas encore inscrit
    //et un bouton s'inscrire s'ajoute
  }

  return (
    <div className="flex items-center justify-center w-screen text-white h-[100vh] bg-yellow-50">
      {/* Conteneur du formulaire centré */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Titre de la page */}
        <h2 className="mb-6 text-2xl font-bold text-center text-yellow-600">Se connecter</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Label et input pour l'email */}
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mise à jour du state email
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Label et input pour le mot de passe */}
          <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour du state password
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Checkbox "Se souvenir de moi" et lien "Mot de passe oublié" */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" />
              Se souvenir de moi
            </label>
            <a href="#" className="text-yellow-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Affichage conditionnel d'un message d'erreur */}
          {error && <p className="mb-4 font-semibold text-red-600">{error}</p>}

          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition-colors bg-yellow-500 rounded hover:bg-yellow-600"
            onClick={verifyEmail}
          >
            Connexion
          </button>
        </form>

        {/* Lien vers la page d'inscription */}
        <p className="mt-6 text-center text-gray-600">
          Pas de compte ?{' '}
          <a href="#" className="text-yellow-600 hover:underline">
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}

export default Connecter