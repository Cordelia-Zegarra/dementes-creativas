import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success('¡Hasta pronto! 👋');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen">
      <header className="bg-harry-dark bg-opacity-90 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-harry-gold">⚡ Dementes Creativas</h1>
            <p className="text-sm text-gray-300">Inventario Harry Potter</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white">Bienvenido, {user?.username} 🧙‍♂️</span>
            <button onClick={handleLogout} className="btn-secondary px-4 py-2">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-3">
            <button className="text-white hover:text-harry-gold transition-colors">Productos</button>
            <button className="text-white hover:text-harry-gold transition-colors">Reportes</button>
            <button className="text-white hover:text-harry-gold transition-colors">Gráficos</button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="card-harry">
          <h2 className="text-2xl font-bold text-harry-dark mb-4">📦 Lista de Productos</h2>
          
          {loading ? (
            <div className="text-center py-8">Cargando productos mágicos...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-harry-gold bg-opacity-20">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Producto</th>
                    <th className="px-4 py-2 text-left">Categoría</th>
                    <th className="px-4 py-2 text-right">Precio Anterior</th>
                    <th className="px-4 py-2 text-right">Precio Actual</th>
                    <th className="px-4 py-2 text-center">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{product.id}</td>
                      <td className="px-4 py-2 font-semibold">{product.name}</td>
                      <td className="px-4 py-2">{product.category || '-'}</td>
                      <td className="px-4 py-2 text-right">Bs. {product.oldPrice}</td>
                      <td className="px-4 py-2 text-right font-bold text-harry-red">Bs. {product.currentPrice}</td>
                      <td className="px-4 py-2 text-center">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
