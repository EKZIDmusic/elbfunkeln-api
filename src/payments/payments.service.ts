import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      status: 'pending',
    });
    return this.paymentsRepository.save(payment);
  }

  findAll() {
    return this.paymentsRepository.find();
  }

  findOne(id: number) {
    return this.paymentsRepository.findOne({ where: { id } });
  }
}
