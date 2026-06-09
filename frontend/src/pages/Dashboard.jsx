import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';
import { HarryPotterElements, SortingHat } from '../components/MagicEffects';
import ProductModal from '../components/ProductModal';
import { generateProductPDF } from '../utils/pdfGenerator';
import MagicCharts from '../components/MagicCharts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchDeletedProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      toast.error('Error al cargar el inventario mágico');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedProducts = async () => {
    try {
      const response = await productAPI.getDeleted();
      setDeletedProducts(response.data);
    } catch (error) {
      console.error('Error al cargar eliminados:', error);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Eliminar "${name}" del inventario?`)) {
      try {
        await productAPI.delete(id);
        toast.success(`📦 "${name}" ha sido archivado mágicamente`);
        fetchProducts();
        fetchDeletedProducts();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleRestore = async (id, name) => {
    if (window.confirm(`¿Restaurar "${name}" al inventario?`)) {
      try {
        await productAPI.restore(id);
        toast.success(`✨ "${name}" ha sido restaurado mágicamente`);
        fetchProducts();
        fetchDeletedProducts();
      } catch (error) {
        toast.error('Error al restaurar');
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleModalSuccess = () => {
    fetchProducts();
    fetchDeletedProducts();
  };

  const tabs = [
    { id: 'products', label: 'Inventario', icon: '📜' },
    { id: 'reports', label: 'Pergaminos', icon: '📄' },
    { id: 'charts', label: 'Profecías', icon: '🔮' },
  ];

  const currentProducts = showDeleted ? deletedProducts : products;
  const isDeletedView = showDeleted;

  return (
    <div className="min-h-screen relative">
      <HarryPotterElements />
      <SortingHat />
      
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
        onSuccess={handleModalSuccess}
      />
      
      <header className="glass-panel sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-float">⚡</div>
              <div>
                <h1 className="font-title text-2xl font-bold text-magic-gold">
                  Dementes Creativas
                </h1>
                <p className="text-xs text-white/60 font-magic">Inventario Mágico</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-white/90 font-semibold">{user?.username}</p>
                <p className="text-xs text-magic-gold/70 font-magic">Mago de Hogwarts</p>
              </div>
              <button 
                onClick={logout}
                className="btn-secondary-magic flex items-center gap-2"
              >
                <span>🚪</span> Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="glass-panel mx-6 mt-6">
        <div className="flex gap-2 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowDeleted(false);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-magic-gold text-magic-primary shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeTab === 'products' && (
          <div className="card-magic">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
              <div>
                <h2 className="font-title text-3xl font-bold text-magic-gold flex items-center gap-3">
                  <span>📜</span> 
                  {isDeletedView ? 'Productos Archivados' : 'Catálogo Mágico'}
                </h2>
                <p className="text-white/60 font-magic">
                  {isDeletedView 
                    ? 'Productos eliminados mágicamente que pueden ser restaurados' 
                    : 'Productos encantados del mundo de Harry Potter'}
                </p>
              </div>
              <div className="flex gap-3">
                {!isDeletedView && (
                  <button
                    onClick={handleAdd}
                    className="btn-magic text-sm"
                  >
                    ✨ Agregar Producto
                  </button>
                )}
                <button
                  onClick={() => setShowDeleted(!showDeleted)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    isDeletedView 
                      ? 'bg-magic-gold text-magic-primary' 
                      : 'bg-red-500/20 text-white hover:bg-red-500/30'
                  }`}
                >
                  {isDeletedView ? '📦 Ver Inventario' : '🗑️ Ver Archivados'}
                </button>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl animate-spin inline-block">🪄</div>
                <p className="text-white/80 mt-4">Cargando productos mágicos...</p>
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-white/80">
                  {isDeletedView ? 'No hay productos archivados' : 'No hay productos en el inventario'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead className="border-b border-magic-gold/30">
                    <tr className="text-left text-magic-gold">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Producto</th>
                      <th className="pb-3">Categoría</th>
                      <th className="pb-3 text-right">Precio Anterior</th>
                      <th className="pb-3 text-right">Precio Actual</th>
                      <th className="pb-3 text-center">Stock</th>
                      <th className="pb-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => (
                      <tr key={product.id} className={`border-b border-white/10 hover:bg-white/5 ${
                        isDeletedView ? 'opacity-70' : ''
                      }`}>
                        <td className="py-3 font-magic text-magic-gold">#{product.id}</td>
                        <td className="py-3 font-semibold">
                          {product.name}
                          {isDeletedView && (
                            <span className="ml-2 text-xs text-red-400">(Archivado)</span>
                          )}
                        </td>
                        <td className="py-3 text-white/70">{product.category || '—'}</td>
                        <td className="py-3 text-right text-white/50 line-through">Bs. {product.oldPrice}</td>
                        <td className="py-3 text-right font-bold text-magic-gold">Bs. {product.currentPrice}</td>
                        <td className="py-3 text-center">{product.stock}</td>
                        <td className="py-3 text-center">
                          <div className="flex gap-2 justify-center">
                            {!isDeletedView ? (
                              <>
                                <button
                                  onClick={() => handleEdit(product)}
                                  className="text-magic-gold hover:text-yellow-400 transition"
                                  title="Editar"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id, product.name)}
                                  className="text-red-400 hover:text-red-300 transition"
                                  title="Eliminar"
                                >
                                  🗑️
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleRestore(product.id, product.name)}
                                className="text-green-400 hover:text-green-300 transition"
                                title="Restaurar"
                              >
                                🔄 Restaurar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {isDeletedView && deletedProducts.length > 0 && (
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg text-center">
                <p className="text-red-400 text-sm">
                  ⚠️ Estos productos están archivados. Puedes restaurarlos o eliminarlos permanentemente desde la base de datos.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="card-magic text-center py-12">
            <div className="text-6xl mb-4 animate-float">📄</div>
            <h2 className="font-title text-3xl font-bold text-magic-gold mb-3">
              Pergaminos de Reportes
            </h2>
            <p className="text-white/70 font-magic mb-6">
              Genera un pergamino mágico con todo tu inventario activo
            </p>
            <button 
              onClick={() => generateProductPDF(products, user?.username)}
              className="btn-magic inline-flex items-center gap-2"
            >
              <span>✨</span> Generar Pergamino PDF
            </button>
          </div>
        )}

        {activeTab === 'charts' && (
          <div className="card-magic">
            <div className="mb-6">
              <h2 className="font-title text-3xl font-bold text-magic-gold flex items-center gap-3">
                <span>🔮</span> Cámara de las Profecías
              </h2>
              <p className="text-white/60 font-magic">Estadísticas y predicciones mágicas del inventario</p>
            </div>
            {loading ? (
              <div className="text-center py-12">
                <div className="text-6xl animate-spin inline-block">🪄</div>
                <p className="text-white/80 mt-4">Revelando profecías...</p>
              </div>
            ) : (
              <MagicCharts products={products} />
            )}
          </div>
        )}
      </main>

      <footer className="text-center py-6 mt-8 border-t border-white/10">
        <p className="text-white/50 text-sm font-magic">
          ⚡ Dementes Creativas - Donde la magia cobra vida ⚡
        </p>
        <div className="flex justify-center gap-3 mt-2">
          <span className="text-xs text-magic-gold/40">🐍</span>
          <span className="text-xs text-magic-gold/40">🦁</span>
          <span className="text-xs text-magic-gold/40">🦅</span>
          <span className="text-xs text-magic-gold/40">🦡</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
