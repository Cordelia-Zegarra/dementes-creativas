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
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async softDelete(id: number): Promise<void> {
    const product = await this.findOne(id);
    product.active = false;
    product.deletedAt = new Date();
    await this.productsRepository.save(product);
  }

  async restore(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id, active: false },
    });
    if (!product) {
      throw new NotFoundException(`Producto eliminado con ID ${id} no encontrado`);
    }
    product.active = true;
    product.deletedAt = null;
    return await this.productsRepository.save(product);
  }

  async findDeleted(): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { active: false },
      withDeleted: true,
    });
  }
}
