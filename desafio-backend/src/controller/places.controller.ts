import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  PlacesCreateDto,
  PlacesQueryDto,
  PlacesUpdateDto,
} from 'src/application/dto/places.dto';
import { PlacesService } from 'src/application/service/places.service';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get('/:id')
  async find(@Param('id') id: number) {
    return this.placesService.find(id);
  }

  @Post('/')
  async create(@Body() data: PlacesCreateDto) {
    return this.placesService.create(data);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: PlacesUpdateDto) {
    data.id = id;
    return this.placesService.update(data);
  }

  @Get('/')
  async list(@Query() query: PlacesQueryDto) {
    return this.placesService.list(query);
  }
}
