import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    const ticket = this.ticketsRepository.create(createTicketDto);
    return this.ticketsRepository.save(ticket);
  }

  findAll(status?: string) {
    if (status) {
      return this.ticketsRepository.find({ where: { status } });
    }
    return this.ticketsRepository.find();
  }

  findOne(id: number) {
    return this.ticketsRepository.findOne({ where: { id } });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketsRepository.update(id, updateTicketDto);
  }

  remove(id: number) {
    return this.ticketsRepository.delete(id);
  }
}
