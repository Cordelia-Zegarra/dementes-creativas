import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const MagicCharts = ({ products }) => {
  console.log('Productos recibidos:', products);
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔮</div>
        <p className="text-white/80">No hay productos para mostrar...</p>
      </div>
    );
  }

  // Convertir precios a números (importante: vienen como strings desde la BD)
  const validProducts = products.map(p => ({
    ...p,
    currentPrice: typeof p.currentPrice === 'string' ? parseFloat(p.currentPrice) : Number(p.currentPrice),
    oldPrice: typeof p.oldPrice === 'string' ? parseFloat(p.oldPrice) : Number(p.oldPrice),
    stock: typeof p.stock === 'string' ? parseInt(p.stock) : Number(p.stock)
  })).filter(p => {
    const isValid = !isNaN(p.currentPrice) && p.currentPrice > 0;
    if (!isValid) console.warn('Producto con precio inválido:', p.name, p.currentPrice);
    return isValid;
  });

  console.log('Productos válidos:', validProducts.length);

  if (validProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔮</div>
        <p className="text-white/80">No hay productos con precios válidos...</p>
        <p className="text-white/50 text-sm mt-2">Revisa la consola para más detalles</p>
      </div>
    );
  }

  // Estadísticas
  const totalProducts = validProducts.length;
  const totalValue = validProducts.reduce((sum, p) => sum + p.currentPrice, 0);
  const avgPrice = totalValue / totalProducts;
  
  // Top 10
  const topExpensive = [...validProducts]
    .sort((a, b) => b.currentPrice - a.currentPrice)
    .slice(0, 10)
    .map(p => ({
      name: p.name.length > 12 ? p.name.substring(0, 10) + '...' : p.name,
      precio: p.currentPrice,
      anterior: p.oldPrice
    }));

  // Categorías
  const categoryStats = validProducts.reduce((acc, p) => {
    const cat = p.category || 'Otros';
    if (!acc[cat]) acc[cat] = { count: 0, value: 0 };
    acc[cat].count++;
    acc[cat].value += p.currentPrice;
    return acc;
  }, {});

  const pieData = Object.entries(categoryStats).map(([name, data]) => ({
    name,
    value: data.count,
    totalValue: data.value
  }));

  const categoryPriceData = Object.entries(categoryStats).map(([name, data]) => ({
    name,
    promedio: data.value / data.count,
    cantidad: data.count
  }));

  const COLORS = ['#ffd700', '#9370db', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#f093fb', '#4facfe', '#43e97b'];
  const lowStock = validProducts.filter(p => p.stock < 5 && p.stock > 0);
  const outOfStock = validProducts.filter(p => p.stock === 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4 text-center border border-magic-gold/20">
          <div className="text-3xl mb-2">📦</div>
          <div className="text-2xl font-bold text-magic-gold">{totalProducts}</div>
          <div className="text-white/70 text-sm">Productos Mágicos</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center border border-magic-gold/20">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-magic-gold">Bs. {totalValue.toFixed(2)}</div>
          <div className="text-white/70 text-sm">Valor del Inventario</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center border border-magic-gold/20">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-2xl font-bold text-magic-gold">Bs. {avgPrice.toFixed(2)}</div>
          <div className="text-white/70 text-sm">Precio Promedio</div>
        </div>
        <div className="bg-white/5 rounded-lg p-4 text-center border border-magic-gold/20">
          <div className="text-3xl mb-2">⚠️</div>
          <div className="text-2xl font-bold text-magic-gold">{lowStock.length + outOfStock.length}</div>
          <div className="text-white/70 text-sm">Stock Bajo / Agotados</div>
        </div>
      </div>

      {topExpensive.length > 0 && (
        <div className="bg-white/5 rounded-lg p-6 border border-magic-gold/20">
          <h3 className="font-title text-xl font-bold text-magic-gold mb-4">🏆 Productos Más Valiosos</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topExpensive}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffd700' }} formatter={(v) => `Bs. ${v}`} />
              <Legend wrapperStyle={{ color: '#ffffff' }} />
              <Bar dataKey="precio" fill="#ffd700" name="Precio Actual (Bs)" />
              <Bar dataKey="anterior" fill="#9370db" name="Precio Anterior (Bs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-6 border border-magic-gold/20">
          <h3 className="font-title text-xl font-bold text-magic-gold mb-4">🔮 Distribución por Categoría</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={120} dataKey="value">
                {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffd700' }} />
              <Legend wrapperStyle={{ color: '#ffffff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 rounded-lg p-6 border border-magic-gold/20">
          <h3 className="font-title text-xl font-bold text-magic-gold mb-4">⚖️ Precio Promedio por Categoría</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={categoryPriceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="name" stroke="#ffffff" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#ffffff" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffd700' }} formatter={(v) => `Bs. ${v.toFixed(2)}`} />
              <Bar dataKey="promedio" fill="#ffd700" name="Precio Promedio (Bs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="bg-white/5 rounded-lg p-6 border border-red-500/30">
          <h3 className="font-title text-xl font-bold text-red-400 mb-4">⚠️ Alertas de Stock</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lowStock.length > 0 && (
              <div>
                <p className="text-magic-gold mb-2">📦 Stock bajo (&lt;5 unidades):</p>
                <ul className="space-y-1">{lowStock.map(p => <li key={p.id} className="text-white/80 text-sm flex justify-between"><span>{p.name}</span><span className="text-yellow-400">Stock: {p.stock}</span></li>)}</ul>
              </div>
            )}
            {outOfStock.length > 0 && (
              <div>
                <p className="text-red-400 mb-2">❌ Agotados:</p>
                <ul className="space-y-1">{outOfStock.map(p => <li key={p.id} className="text-white/80 text-sm flex justify-between"><span>{p.name}</span><span className="text-red-400">Agotado</span></li>)}</ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MagicCharts;
