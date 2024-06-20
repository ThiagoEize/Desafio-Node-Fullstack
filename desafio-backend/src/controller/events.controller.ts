import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  EventsCreateDto,
  EventsQueryDto,
  EventsUpdateDto,
} from 'src/application/dto/events.dto';
import { EventsService } from 'src/application/service/events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Find event by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Event ID' })
  async find(@Param('id') id: number) {
    return this.eventsService.find(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new event' })
  async create(@Body() data: EventsCreateDto) {
    return this.eventsService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an event' })
  @ApiParam({ name: 'id', type: Number, description: 'Event ID' })
  async update(@Param('id') id: number, @Body() data: EventsUpdateDto) {
    data.id = id;
    return this.eventsService.update(data);
  }

  @Get('/')
  @ApiOperation({ summary: 'List all events' })
  @ApiQuery({ name: 'placeId', required: false, type: Number })
  @ApiQuery({ name: 'event', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, type: String })
  @ApiQuery({ name: 'dateStart', required: false, type: Date })
  @ApiQuery({ name: 'dateEnd', required: false, type: Date })
  @ApiQuery({ name: 'order', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(@Query() query: EventsQueryDto) {
    return this.eventsService.list(query);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an event' })
  @ApiParam({ name: 'id', type: Number, description: 'Event ID' })
  async delete(@Param('id') id: number) {
    return this.eventsService.delete(id);
  }
}
