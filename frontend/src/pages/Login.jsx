import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { HarryPotterElements, SortingHat, WandEffect } from '../components/MagicEffects';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWandEffect, setShowWandEffect] = useState(false);
  const { login } = useAuth();

  const loadCaptcha = async () => {
    try {
      const response = await api.get('/auth/captcha');
      setCaptchaSvg(response.data.svg);
      setCaptchaId(response.data.id);
      setCaptcha('');
    } catch (error) {
      console.error('Error loading CAPTCHA:', error);
      toast.error('Error al cargar el CAPTCHA');
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowWandEffect(true);
    
    const result = await login(username, password, captchaId, captcha);
    
    if (result.success) {
      toast.success('✨ ¡Bienvenido a Hogwarts! ✨');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 600);
    } else {
      toast.error(result.error || 'Credenciales incorrectas');
      setShowWandEffect(false);
      loadCaptcha();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <WandEffect isActive={showWandEffect} />
      <HarryPotterElements />
      <SortingHat />
      
      <div className="card-magic max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="text-6xl">⚡</div>
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
            <div className="flex items-center gap-3 mb-2">
              {captchaSvg ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: captchaSvg }} 
                  className="bg-white rounded p-1 flex-shrink-0 overflow-hidden"
                  style={{ 
                    width: '150px', 
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              ) : (
                <div className="bg-gray-200 rounded p-2 w-[150px] h-[50px] flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Cargando...</span>
                </div>
              )}
              <button
                type="button"
                onClick={loadCaptcha}
                className="text-magic-gold hover:text-yellow-400 text-2xl"
                title="Recargar CAPTCHA"
              >
                🔄
              </button>
            </div>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="input-magic"
              required
              placeholder="Ingresa los números del hechizo"
            />
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
