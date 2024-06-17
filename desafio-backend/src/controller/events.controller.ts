import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  EventsCreateDto,
  EventsQueryDto,
  EventsUpdateDto,
} from 'src/application/dto/events.dto';
import { EventsService } from 'src/application/service/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/:id')
  async find(@Param('id') id: number) {
    return this.eventsService.find(id);
  }

  @Post('/')
  async create(@Body() data: EventsCreateDto) {
    return this.eventsService.create(data);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: EventsUpdateDto) {
    data.id = id;
    return this.eventsService.update(data);
  }

  @Get('/')
  async list(@Body() query: EventsQueryDto) {
    return this.eventsService.list(query);
  }
}
