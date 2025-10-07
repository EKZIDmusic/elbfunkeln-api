import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribeDto } from './dto/subscribe.dto';
import { NewsletterSubscriber } from './entities/newsletter-subscriber.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(NewsletterSubscriber)
    private subscribersRepository: Repository<NewsletterSubscriber>,
  ) {}

  async subscribe(subscribeDto: SubscribeDto) {
    const existing = await this.subscribersRepository.findOne({
      where: { email: subscribeDto.email },
    });

    if (existing) {
      return { message: 'Already subscribed' };
    }

    const subscriber = this.subscribersRepository.create(subscribeDto);
    await this.subscribersRepository.save(subscriber);
    return { message: 'Successfully subscribed' };
  }

  findAll() {
    return this.subscribersRepository.find({ where: { isActive: true } });
  }

  async unsubscribe(email: string) {
    await this.subscribersRepository.update({ email }, { isActive: false });
    return { message: 'Successfully unsubscribed' };
  }
}
