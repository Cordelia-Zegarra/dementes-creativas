import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedProducts();
  }

  private async seedProducts() {
    const count = await this.productsRepository.count();
    if (count > 0) {
      console.log('📦 Los productos ya existen en la base de datos');
      return;
    }

    const products = [
      { name: 'Mapas', oldPrice: 20, currentPrice: 25, category: 'Mapas', stock: 10 },
      { name: 'Periódico', oldPrice: 2, currentPrice: 2, category: 'Papelería', stock: 50 },
      { name: 'Revista "EL QUISQUILLOSO"', oldPrice: 3, currentPrice: 3, category: 'Papelería', stock: 30 },
      { name: 'Cartas', oldPrice: 14, currentPrice: 16, category: 'Juegos', stock: 20 },
      { name: 'Envoltura de chocolate', oldPrice: 3, currentPrice: 3, category: 'Papelería', stock: 100 },
      { name: 'Etiqueta de loncheras', oldPrice: 2.5, currentPrice: 2.5, category: 'Papelería', stock: 80 },
      { name: 'Etiqueta de aretes', oldPrice: 1, currentPrice: 1, category: 'Papelería', stock: 80 },
      { name: 'Hojas de varitas', oldPrice: 1, currentPrice: 1.5, category: 'Papelería', stock: 60 },
      { name: 'Billetes de alasita', oldPrice: 12, currentPrice: 15, category: 'Coleccionables', stock: 40 },
      { name: 'Billetes dólares Malfoy', oldPrice: 10, currentPrice: 12, category: 'Coleccionables', stock: 40 },
      { name: 'Posters', oldPrice: 2, currentPrice: 3, category: 'Decoración', stock: 25 },
      { name: 'Tarjetas de regalo', oldPrice: 5, currentPrice: 6, category: 'Papelería', stock: 50 },
      { name: 'Álbum de fotos', oldPrice: 180, currentPrice: 200, category: 'Álbumes', stock: 5 },
      { name: 'Libros "TE AMO"', oldPrice: 70, currentPrice: 80, category: 'Libros', stock: 15 },
      { name: 'Botones', oldPrice: 6, currentPrice: 7, category: 'Accesorios', stock: 100 },
      { name: 'Ramos', oldPrice: 50, currentPrice: 50, category: 'Decoración', stock: 8 },
      { name: 'Libretita Cuadrada', oldPrice: 8, currentPrice: 10, category: 'Libretas', stock: 30 },
      { name: 'Libretita Larga', oldPrice: 8, currentPrice: 10, category: 'Libretas', stock: 30 },
      { name: 'Cuaderno Medio oficio', oldPrice: 35, currentPrice: 40, category: 'Libretas', stock: 20 },
      { name: 'Imanes Pequeños', oldPrice: 7, currentPrice: 8, category: 'Imanes', stock: 50 },
      { name: 'Imanes Grandes', oldPrice: 8, currentPrice: 9, category: 'Imanes', stock: 40 },
      { name: 'Tazas Mágicas', oldPrice: 30, currentPrice: 35, category: 'Tazas', stock: 12 },
      { name: 'Tazas Blancas', oldPrice: 15, currentPrice: 20, category: 'Tazas', stock: 15 },
      { name: 'Tazas Doradas', oldPrice: 40, currentPrice: 0, category: 'Tazas', stock: 0 },
      { name: 'Cuadros Pequeños', oldPrice: 15, currentPrice: 20, category: 'Cuadros', stock: 10 },
      { name: 'Cuadros Grandes', oldPrice: 40, currentPrice: 40, category: 'Cuadros', stock: 8 },
      { name: 'Cuadro de Vidrio', oldPrice: 70, currentPrice: 80, category: 'Cuadros', stock: 4 },
    ];

    for (const productData of products) {
      const product = new Product();
      product.name = productData.name;
      product.oldPrice = productData.oldPrice;
      product.currentPrice = productData.currentPrice;
      product.category = productData.category;
      product.stock = productData.stock;
      product.active = true;
      
      await this.productsRepository.save(product);
    }

    console.log(`🌱 ${products.length} productos de Harry Potter cargados exitosamente`);
  }
}
