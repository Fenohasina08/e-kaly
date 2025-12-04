 import React, { useState, useRef, useEffect } from "react";
import Particles from "./ParticlesLight";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const sanitize = (str) => str.replace(/[<>"'()]/g, "");

const MAX_ATTEMPTS = 5;
const INITIAL_DELAY = 1000;

const Connecter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [lockTime, setLockTime] = useState(0);

  const errorRef = useRef();

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) {
      const delay = INITIAL_DELAY * Math.pow(2, attempts - MAX_ATTEMPTS);
      setLockTime(Date.now() + delay);
    }
  }, [attempts]);

  const isLocked = Date.now() < lockTime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isLocked) {
      setError("Veuillez patienter avant une nouvelle tentative.");
      return;
    }

    const cleanEmail = sanitize(email);
    const cleanPwd = sanitize(password);

    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError("Email invalide.");
      return;
    }
    if (!PASSWORD_REGEX.test(cleanPwd)) {
      setError("Mot de passe invalide.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const isValid = cleanEmail === "test@test.com" && cleanPwd === "Test1234";

    if (!isValid) {
      setAttempts((p) => p + 1);
      setLoading(false);
      setError("Identifiants incorrects.");
      return;
    }

    setSuccess("Connexion réussie !");
    localStorage.setItem("rememberEmail", cleanEmail);
    setLoading(false);
  };

  return (
    <div className="relative flex w-screen h-screen overflow-hidden bg-white">

      {/* --- RIGHT SIDE : illustration + animation --- */}
      <div className="relative items-center justify-center hidden w-1/2 bg-blue-800 md:flex">
        <Particles />

        {/* Illustration style SeedProd */}
        <div className="absolute text-center bottom-5">
          <div className="w-[140vw]  h-[40vh] animate-bounce-slow">
            🚀
          </div>
          <h2 className="mt-4 text-lg font-semibold text-purple-800 opacity-80">
            Faites décoller votre projet
          </h2>
        </div>
      </div>

      {/* --- LEFT SIDE : form --- */}
      <div className="flex items-center justify-center w-1/2 bg-white px-120 md:w-1/2">
        <div className="w-full max-w-md p-8 rounded-2xl bg-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 animate-fadeInSoft">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
            Se connecter
          </h2>

          {error && (
            <p
              ref={errorRef}
              tabIndex="-1"
              aria-live="assertive"
              className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              aria-live="polite"
              className="p-3 mb-4 text-green-700 bg-green-100 border border-green-300 rounded"
            >
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              className="w-full p-3 mb-4 border rounded focus:ring-4 focus:ring-purple-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Mot de passe
            </label>

            <div className="relative mb-4">
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                placeholder="Votre mot de passe"
                className="w-full p-3 border rounded focus:ring-4 focus:ring-purple-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute text-sm text-gray-600 right-1 top-2 hover:text-gray-900"
              >
                {showPwd ? "Cacher" : "Voir"}
              </button>
            </div>

            <label className="flex items-center mb-4 text-gray-700">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              Se souvenir de moi
            </label>

            <button
              type="submit"
              disabled={loading || isLocked}
              className="w-full py-3 text-white transition-all bg-purple-600 rounded-lg hover:bg-purple-700 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Chargement..." : "Connexion"}
            </button>

            <p className="mt-6 text-center text-gray-700">
              Pas de compte ?{" "}
              <a href="/signup" className="font-medium text-purple-700 hover:underline">
                Inscrivez-vous
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connecter;
