import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'old_price' })
  oldPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'current_price', nullable: true })
  currentPrice: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
