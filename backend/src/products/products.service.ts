import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { active: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id, active: true },
    });
    if (!product) {
      throw new NotFoundException(`Producto activo con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async softDelete(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    product.active = false;
    product.deletedAt = new Date();
    await this.productsRepository.save(product);
    console.log(`✅ Producto ${id} eliminado lógicamente`);
  }

  async restore(id: number): Promise<Product> {
    // Usar withDeleted() para encontrar el producto incluso si tiene deleted_at
    const product = await this.productsRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    
    if (product.active === true) {
      throw new NotFoundException(`El producto ${id} ya está activo`);
    }
    
    product.active = true;
    product.deletedAt = null;
    const restored = await this.productsRepository.save(product);
    console.log(`✅ Producto ${id} restaurado exitosamente`);
    return restored;
  }

  async findDeleted(): Promise<Product[]> {
    const deleted = await this.productsRepository.find({
      where: { active: false },
      withDeleted: true,
    });
    console.log(`📦 Encontrados: ${deleted.length} productos eliminados`);
    return deleted;
  }
}
