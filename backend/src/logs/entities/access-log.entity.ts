import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('access_logs')
export class AccessLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  event: string; // 'login' o 'logout'

  @Column({ type: 'varchar', length: 50 })
  ip: string;

  @Column({ type: 'varchar', length: 255 })
  userAgent: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
