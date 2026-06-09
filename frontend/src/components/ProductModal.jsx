import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    oldPrice: '',
    currentPrice: '',
    category: '',
    stock: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        oldPrice: product.oldPrice || '',
        currentPrice: product.currentPrice || '',
        category: product.category || '',
        stock: product.stock || ''
      });
    } else {
      setFormData({
        name: '',
        oldPrice: '',
        currentPrice: '',
        category: '',
        stock: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        oldPrice: parseFloat(formData.oldPrice),
        currentPrice: parseFloat(formData.currentPrice),
        stock: parseInt(formData.stock) || 0
      };

      if (product) {
        await productAPI.update(product.id, data);
        toast.success('✨ Producto actualizado mágicamente');
      } else {
        await productAPI.create(data);
        toast.success('✨ Nuevo producto agregado al inventario');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="card-magic max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-title text-2xl font-bold text-magic-gold">
            {product ? '📝 Editar Producto' : '✨ Agregar Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-magic-gold text-sm mb-1">Nombre del producto *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-magic"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-magic-gold text-sm mb-1">Precio anterior</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                className="input-magic"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-magic-gold text-sm mb-1">Precio actual *</label>
              <input
                type="number"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleChange}
                className="input-magic"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-magic-gold text-sm mb-1">Categoría</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-magic"
                placeholder="Ej: Varitas, Libros..."
              />
            </div>
            <div>
              <label className="block text-magic-gold text-sm mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="input-magic"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-magic"
            >
              {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
