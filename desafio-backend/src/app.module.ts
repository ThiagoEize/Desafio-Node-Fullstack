import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesController } from './controller/places.controller';
import { PlacesService } from './application/service/places.service';
import { PrismaService } from './application/module/prisma.service';
import { EventsController } from './controller/events.controller';
import { EventsService } from './application/service/events.service';

@Module({
  imports: [],
  controllers: [AppController, PlacesController, EventsController],
  providers: [AppService, PlacesService, PrismaService, EventsService],
})
export class AppModule {}
