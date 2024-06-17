import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesController } from './controller/places.controller';
import { PlacesService } from './application/service/places.service';
import { PrismaService } from './application/module/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, PlacesController],
  providers: [AppService, PlacesService, PrismaService],
})
export class AppModule {}
