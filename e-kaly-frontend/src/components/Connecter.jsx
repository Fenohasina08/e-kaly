 import React, { useEffect, useRef, useState } from "react";

// Redesign du composant Connecter — React + Tailwind
// Usage: coller ce fichier dans src/components/Connecter.jsx
// Dépendances: TailwindCSS configuré dans le projet

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const MAX_ATTEMPTS = 5;
const INITIAL_DELAY = 1000; // ms

export default function Connecter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [lockCountdown, setLockCountdown] = useState(0);

  const [message, setMessage] = useState({ text: "", type: "" }); // type: error | success | info
  const messageRef = useRef(null);

  // Pré-remplir si "remember" stocké
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRemember(true);
    }
  }, []);

  // Accessibility: focus message when it changes
  useEffect(() => {
    if (message.text) messageRef.current?.focus();
  }, [message]);

  // Verrouillage (exponential backoff)
  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) {
      const delay = INITIAL_DELAY * Math.pow(2, attempts - MAX_ATTEMPTS);
      const until = Date.now() + delay;
      setLockUntil(until);
    }
  }, [attempts]);

  // Countdown pour affichage
  useEffect(() => {
    if (lockUntil <= Date.now()) {
      setLockCountdown(0);
      return;
    }
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
      setLockCountdown(remaining);
      if (remaining <= 0) {
        setLockUntil(0);
      }
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [lockUntil]);

  const sanitize = (s) => s.replace(/[<>"'()]/g, "");
  const isLocked = () => lockUntil > Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (isLocked()) {
      setMessage({ text: `Trop de tentatives. Réessayez dans ${lockCountdown} s.`, type: "error" });
      return;
    }

    const cleanEmail = sanitize(email.trim());
    const cleanPwd = sanitize(password);

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setMessage({ text: "Adresse e‑mail invalide — exemple: utilisateur@domaine.com", type: "error" });
      return;
    }

    if (!PASSWORD_REGEX.test(cleanPwd)) {
      setMessage({
        text: "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    // Simuler requête réseau
    await new Promise((r) => setTimeout(r, 900));

    const valid = cleanEmail === "test@test.com" && cleanPwd === "Test1234";

    if (!valid) {
      setAttempts((p) => p + 1);
      setLoading(false);
      setMessage({ text: "Identifiants incorrects. Vérifiez et réessayez.", type: "error" });
      return;
    }

    // Succès
    setLoading(false);
    setMessage({ text: "Connexion réussie — bienvenue !", type: "success" });

    if (remember) localStorage.setItem("rememberEmail", cleanEmail);
    else localStorage.removeItem("rememberEmail");

    // Ici tu ferais redirect / setAuth
  };

  return (
    <div className="flex flex-col min-h-screen w-[100vw] md:flex-row bg-gradient-to-b from-white to-amber-50">
      {/* LEFT: illustration légère */}
      <aside className="relative items-center justify-center hidden overflow-hidden md:flex md:w-1/2 bg-gradient-to-br from-amber-100 to-orange-50">
        {/* Overlay image ou illustration vectorielle */}
        <div className="absolute inset-0 bg-[url('/images/kitchen-texture.jpg')] bg-cover bg-center opacity-40" />
        <div className="relative z-10 max-w-xs p-8 text-center">
          <svg width="84" height="84" viewBox="0 0 24 24" fill="none" aria-hidden className="mx-auto mb-4">
            <rect width="24" height="24" rx="6" fill="#F59E0B" />
            <path d="M7 12c2 1.5 4 1.5 6 0" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h3 className="text-2xl font-semibold text-orange-800"> Découvrez les saveurs de Madagascar</h3>
          <p className="mt-2 text-gray-700"> Connectez-vous pour explorer nos plats traditionnels et commander en quelques clics.</p>
        </div>
        {/* Subtle animated steam */}
        <div className="absolute w-32 h-32 pointer-events-none bottom-10 right-10 opacity-60">
          <div className="w-full h-full rounded-full animate-[float_6s_ease-in-out_infinite] bg-gradient-to-t from-white/20 to-transparent" />
        </div>
      </aside>

      {/* RIGHT: Form */}
      <main className="flex items-center justify-center flex-1 p-6">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center justify-center rounded-full w-14 h-14 bg-amber-100">
              <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" fill="#92400E" />
                <path d="M4 19c0-3.314 3.582-6 8-6s8 2.686 8 6v1H4v-1z" fill="#F59E0B" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800">Connexion à votre espace</h1>
          <p className="mt-2 text-center text-gray-600">Entrez vos identifiants pour continuer</p>

          {message.text && (
            <div
              ref={messageRef}
              tabIndex={-1}
              role={message.type === "error" ? "alert" : "status"}
              aria-live={message.type === "error" ? "assertive" : "polite"}
              className={`mt-6 p-4 rounded-md border ${
                message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-amber-50 border-amber-100 text-amber-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse e‑mail
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  {/* mail icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 8.5l8.5 5 8.5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@domaine.com"
                  className="block w-full py-3 pl-10 pr-3 text-gray-800 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  {/* lock icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="#9CA3AF" strokeWidth="1.5" />
                    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="block w-full py-3 pl-10 pr-24 text-gray-800 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute text-sm font-medium -translate-y-1/2 right-3 top-1/2 text-amber-600 hover:text-amber-800"
                  aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPwd ? "Masquer" : "Afficher"}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Au moins 8 caractères, 1 majuscule, 1 chiffre.</p>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 mr-2 rounded text-amber-600 focus:ring-amber-400"
                />
                Se souvenir de moi
              </label>

              <a href="/forgot-password" className="text-sm text-amber-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || isLocked()}
                className="inline-flex items-center justify-center w-full gap-2 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Connexion...
                  </>
                ) : isLocked() ? (
                  `Réessayez dans ${lockCountdown}s`
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>

            <div className="pt-4 text-center border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <a href="/signup" className="font-semibold text-amber-600 hover:underline">
                  Créer un compte
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
