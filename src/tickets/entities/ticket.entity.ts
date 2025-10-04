import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ticketNumber!: string;

  @Column()
  userId!: number;

  @Column()
  eventDate!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: 'valid' })
  status!: string;

  @Column({ default: false })
  isUsed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
