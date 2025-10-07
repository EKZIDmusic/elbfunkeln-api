import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepository: Repository<Shipping>,
  ) {}

  create(createShippingDto: CreateShippingDto) {
    const shipping = this.shippingRepository.create(createShippingDto);
    return this.shippingRepository.save(shipping);
  }

  findAll() {
    return this.shippingRepository.find();
  }

  findOne(id: number) {
    return this.shippingRepository.findOne({ where: { id } });
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return this.shippingRepository.update(id, updateShippingDto);
  }
}
