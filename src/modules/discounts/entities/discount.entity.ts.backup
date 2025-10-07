import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('discounts')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ default: 0 })
  usageLimit: number;

  @Column({ default: 0 })
  usageCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
