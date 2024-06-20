import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesController } from './controller/places.controller';
import { PlacesService } from './application/service/places.service';
import { PrismaService } from './application/module/prisma.service';
import { EventsController } from './controller/events.controller';
import { EventsService } from './application/service/events.service';
import { GatesController } from './controller/gates.controller';
import { GatesService } from './application/service/gates.service';
import { TurnstilesController } from './controller/turnstiles.controller';
import { TurnstilesService } from './application/service/turnstiles.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PlacesController,
    EventsController,
    GatesController,
    TurnstilesController,
  ],
  providers: [
    AppService,
    PlacesService,
    PrismaService,
    EventsService,
    GatesService,
    TurnstilesService,
  ],
})
export class AppModule {}
