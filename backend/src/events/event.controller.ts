import { Controller, Get, Delete, Patch, Query, Param, Body, Req, Post, Headers } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.entity';
import { ApiOperation, ApiImplicitQuery, ApiBearerAuth, ApiResponse, ApiImplicitParam, ApiImplicitBody } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UpdateEventDTO, CreateEventDTO, EventDTO } from './dto/event.dto';
import { ISearchEventParams } from './interfaces/event.interfaces';
import { AUTHORIZATION_HEADER } from 'src/constants';

@Controller('/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOperation({ title: 'get user events', operationId: 'getEventsByUser' })
  @ApiImplicitQuery({ name: 'title', required: false })
  @ApiImplicitQuery({ name: 'description', required: false })
  @ApiImplicitQuery({ name: 'dateFrom', required: false })
  @ApiImplicitQuery({ name: 'dateTo', required: false })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [EventDTO] })
  getByUserId(
    @Headers(AUTHORIZATION_HEADER) token: string,
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ): Promise<Event[]> {
    const { userId } = jwt.decode(token.split(' ')[1]);
    const searchParams: ISearchEventParams = {
      title,
      description,
      date: {
        from: dateFrom && new Date(dateFrom),
        to: dateTo && new Date(dateTo),
      },
      userId,
    };
    return this.eventService.find(searchParams);
  }

  @Get(':id')
  @ApiOperation({ title: 'get event by id', operationId: 'getById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDTO })
  getById(@Param('id') id: number): Promise<Event> {
    return this.eventService.get(id);
  }

  @Post()
  @ApiOperation({ title: 'create event by id', operationId: 'create' })
  @ApiImplicitBody({ name: 'CreateEventDTO', type: CreateEventDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDTO })
  async create(@Headers(AUTHORIZATION_HEADER) token: string, @Body() body: CreateEventDTO): Promise<Event> {
    const { userId } = jwt.decode(token.split(' ')[1]);
    body.user_id = userId;
    return this.eventService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ title: 'update event by id', operationId: 'updateById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiImplicitBody({ name: 'UpdateEventDTO', type: UpdateEventDTO })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDTO })
  async update(@Param('id') id: number, @Body() body: UpdateEventDTO): Promise<Event> {
    return this.eventService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ title: 'delete event by id', operationId: 'deleteById' })
  @ApiImplicitParam({ name: 'id' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, type: null })
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.eventService.delete(id);
  }
}
