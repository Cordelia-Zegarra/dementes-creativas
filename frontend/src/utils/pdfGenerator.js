import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateProductPDF = (products, username) => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.setTextColor(218, 165, 32);
  doc.text('Dementes Creativas', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text('Inventario Mágico de Harry Potter', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Generado por: ${username}`, 14, 45);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 52);
  
  // Tabla de productos
  const tableData = products.map(p => [
    p.id,
    p.name,
    p.category || '-',
    `Bs. ${p.oldPrice}`,
    `Bs. ${p.currentPrice}`,
    p.stock
  ]);
  
  autoTable(doc, {
    startY: 60,
    head: [['ID', 'Producto', 'Categoría', 'Precio Ant.', 'Precio Actual', 'Stock']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [218, 165, 32], textColor: [0, 0, 0] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });
  
  // Pie de página
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'Dementes Creativas - Donde la magia cobra vida',
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
  
  doc.save(`inventario_magico_${new Date().toISOString().split('T')[0]}.pdf`);
};
