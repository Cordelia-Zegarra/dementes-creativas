import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(username, password, captcha);
    
    if (result.success) {
      toast.success('Bienvenido a Dementes Creativas 🧙‍♂️');
      window.location.href = '/dashboard';
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card-harry max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-harry-gold mb-2">⚡ Dementes Creativas</h1>
          <p className="text-gray-600">Inventario Mágico de Harry Potter</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-harry"
              required
              placeholder="Ingresa tu usuario"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-harry"
              required
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">CAPTCHA</label>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="input-harry"
              required
              placeholder="Resuelve el CAPTCHA"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Ingresando...' : '✨ Ingresar al Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
