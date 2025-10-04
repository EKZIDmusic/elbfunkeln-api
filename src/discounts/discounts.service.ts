import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountsRepository: Repository<Discount>,
  ) {}

  create(createDiscountDto: CreateDiscountDto) {
    const discount = this.discountsRepository.create(createDiscountDto);
    return this.discountsRepository.save(discount);
  }

  findAll() {
    return this.discountsRepository.find({ where: { isActive: true } });
  }

  findByCode(code: string) {
    return this.discountsRepository.findOne({ where: { code, isActive: true } });
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return this.discountsRepository.update(id, updateDiscountDto);
  }

  remove(id: number) {
    return this.discountsRepository.delete(id);
  }
}
