import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository, DeleteResult, Between } from 'typeorm';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDateRange, ISearchEventParams } from './interfaces/event.interfaces';
import { CreateEventDTO, UpdateEventDTO } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async get(id: number): Promise<Event> {
    return this.eventRepository.findOne(id);
  }

  async find(searchParams: ISearchEventParams): Promise<Event[]> {
    console.log(searchParams);
    const searchp = {user_id: searchParams.userId};
    searchParams.title ? Object.assign(searchp, {title: searchParams.title}) : undefined;
    searchParams.description ? Object.assign(searchp, {description: searchParams.description}) : undefined;
    searchParams.date && searchParams.date.from && searchParams.date.to 
        ? Object.assign(searchp, {date: Between(searchParams.date.from, searchParams.date.to)}) : undefined;
    console.log(searchp);
    return this.eventRepository.find({ where: searchp});    
  }

  async create(body: CreateEventDTO): Promise<Event> {
    const event = await this.eventRepository.find({ where: { title: body.title }});
    if (event.length > 0) {
      throw new HttpException('Event with such title already exists', HttpStatus.BAD_REQUEST);
    }
    const newEvent = this.eventRepository.create(body);
    return this.eventRepository.save(newEvent);
  }

  async update(id: number, body: UpdateEventDTO): Promise<Event> {
    const event = await this.eventRepository.find({ where: { title: body.title }});
    if (event.length > 0) {
      throw new HttpException('Event with such title already exists', HttpStatus.BAD_REQUEST);
    }
    await this.eventRepository.update(id, body);
    return this.get(id);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.eventRepository.delete(id);
  }
}
