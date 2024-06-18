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

    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.placeId) where.placeId = query.placeId;
    if (query.event) where.event = { contains: query.event };
    if (query.type) where.type = { contains: query.type };
    if (query.dateStart) where.dateStart = query.dateStart;
    if (query.hourStart) where.hourStart = { contains: query.hourStart };
    if (query.dateEnd) where.dateEnd = query.dateEnd;
    if (query.hourEnd) where.hourEnd = { contains: query.hourEnd };

    const orderBy: any = {};
    if (query.order) {
      const [field, direction] = query.order.split(' ');
      orderBy[field] = direction;
    }

    const events = await this.prisma.event.findMany({
      where,
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
      skip: skip,
      take: limit,
    });

    const totalEvents = await this.prisma.event.count({ where });

    return {
      data: events,
      total: totalEvents,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalEvents / limit),
    };
  }
}
