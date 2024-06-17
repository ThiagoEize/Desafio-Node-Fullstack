import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/application/module/prisma.service';
import {
  EventsCreateDto,
  EventsQueryDto,
  EventsUpdateDto,
} from '../dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  private logger: Logger = new Logger();

  async create(data: EventsCreateDto) {
    this.logger.log(`Creating event with data: ${JSON.stringify(data)}`);

    return await this.prisma.event.create({
      data: {
        placeId: data.placeId,
        event: data.event,
        type: data.type,
        dateStart: data.dateStart,
        hourStart: data.hourStart,
        dateEnd: data.dateEnd,
        hourEnd: data.hourEnd,
      },
    });
  }

  async update(data: EventsUpdateDto) {
    this.logger.log(`Updating event with data: ${JSON.stringify(data)}`);

    const event = await this.prisma.event.findFirstOrThrow({
      where: {
        id: Number(data.id),
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return await this.prisma.event.update({
      where: {
        id: Number(event.id),
      },
      data: {
        placeId: data.placeId ?? event.placeId,
        event: data.event ?? event.event,
        type: data.type ?? event.type,
        dateStart: data.dateStart ?? event.dateStart,
        hourStart: data.hourStart ?? event.hourStart,
        dateEnd: data.dateEnd ?? event.dateEnd,
        hourEnd: data.hourEnd ?? event.hourEnd,
      },
    });
  }

  async find(id: number) {
    this.logger.log(`Find event with ID ${id}`);

    return await this.prisma.event.findFirstOrThrow({
      where: {
        id: Number(id),
      },
      include: {
        place: true,
      },
    });
  }

  async list(query: EventsQueryDto) {
    this.logger.log(`Listing events with filters ${JSON.stringify(query)}`);

    return await this.prisma.event.findMany({
      where: {
        placeId: query.placeId ?? undefined,
        event: {
          contains: query.event ?? undefined,
        },
        type: {
          contains: query.type ?? undefined,
        },
        dateStart: query.dateStart ?? undefined,
        hourStart: {
          contains: query.hourStart ?? undefined,
        },
        dateEnd: query.dateEnd ?? undefined,
        hourEnd: {
          contains: query.hourEnd ?? undefined,
        },
      },
      orderBy: query.order
        ? {
            [query.order.split(' ')[0]]: query.order.split(' ')[1],
          }
        : undefined,
    });
  }
}
