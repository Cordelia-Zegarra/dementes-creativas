import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { HarryPotterElements, MagicWands, SortingHat, Owl, WandEffect } from '../components/MagicEffects';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWandEffect, setShowWandEffect] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowWandEffect(true);
    
    const result = await login(username, password, captcha);
    
    if (result.success) {
      toast.success('✨ ¡Bienvenido a Hogwarts! ✨');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 600);
    } else {
      toast.error(result.error || 'Credenciales incorrectas');
      setShowWandEffect(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Efecto de varita al hacer login */}
      <WandEffect isActive={showWandEffect} />
      
      {/* Elementos decorativos de Harry Potter */}
      <HarryPotterElements />
      <MagicWands />
      <SortingHat />
      <Owl />
      
      {/* Fondo de estrellas */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      
      {/* Card de login - SIN animación constante */}
      <div className="card-magic max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="text-6xl">⚡</div>
            <div className="absolute -top-2 -right-2 text-magic-gold text-xl animate-sparkle">✨</div>
          </div>
          <h1 className="magic-title text-4xl mb-2">Dementes Creativas</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-magic-gold to-transparent mx-auto my-3"></div>
          <p className="text-magic-gold/70 font-magic italic">Inventario Mágico de Harry Potter</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-magic-gold font-semibold mb-2 text-sm tracking-wider">
              🧙‍♂️ USUARIO
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-magic"
              required
              placeholder="harry_potter"
            />
          </div>
          
          <div>
            <label className="block text-magic-gold font-semibold mb-2 text-sm tracking-wider">
              🔒 CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-magic"
              required
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-magic-gold font-semibold mb-2 text-sm tracking-wider">
              🛡️ HECHIZO DE VERIFICACIÓN
            </label>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="input-magic"
              required
              placeholder="Ingresa el código mágico"
            />
            <p className="text-xs text-white/40 mt-1 italic">
              * Por ahora ingresa cualquier texto
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-magic w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">🪄</span>
                Abriendo el mundo mágico...
              </span>
            ) : (
              <span>Ingresar a Hogwarts</span>
            )}
          </button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs italic font-magic">
            "No todo lo que es oro brilla"
          </p>
          <p className="text-white/30 text-[10px] mt-2">
            Dementes Creativas ⚡ Desde 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
