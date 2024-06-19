import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/application/module/prisma.service';
import {
  PlacesCreateDto,
  PlacesQueryDto,
  PlacesUpdateDto,
} from '../dto/places.dto';

@Injectable()
export class PlacesService {
  constructor(private prisma: PrismaService) {}
  private logger: Logger = new Logger();

  async create(data: PlacesCreateDto) {
    this.logger.log(`Creating place with data: ${JSON.stringify(data)}`);

    const place = await this.prisma.place.create({
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        gates: {
          create: data.gates.map((gate) => ({
            name: gate.name,
          })),
        },
      },
      include: {
        gates: true, // Include gates in the response
      },
    });

    return place;
  }

  async update(data: PlacesUpdateDto) {
    this.logger.log(`Updating place with data: ${JSON.stringify(data)}`);

    const place = await this.prisma.place.findFirstOrThrow({
      where: {
        id: Number(data.id),
      },
      include: {
        gates: true, // Include gates for the place
      },
    });

    if (!place) {
      throw new Error('Place not found');
    }

    // Extract existing gate IDs and names
    const existingGates = place.gates.map((gate) => ({
      id: gate.id,
      name: gate.name,
    }));

    // Find gates to be deleted
    const missingGates = existingGates.filter(
      (existingGate) =>
        !data.gates.some((newGate) => newGate.id === existingGate.id),
    );

    if (missingGates.length > 0) {
      await this.prisma.gate.deleteMany({
        where: {
          id: {
            in: missingGates.map((gate) => gate.id),
          },
        },
      });
    }

    // Create or update gates
    await Promise.all(
      data.gates.map(async (gate) => {
        if (gate.id) {
          // Update existing gate
          await this.prisma.gate.update({
            where: { id: gate.id },
            data: {
              name: gate.name,
              placeId: place.id,
            },
          });
        } else {
          // Create new gate
          await this.prisma.gate.create({
            data: {
              name: gate.name,
              placeId: place.id,
            },
          });
        }
      }),
    );

    // Update the place details
    const updatedPlace = await this.prisma.place.update({
      where: {
        id: Number(place.id),
      },
      data: {
        name: data.name ?? place.name,
        address: data.address ?? place.address,
        city: data.city ?? place.city,
        state: data.state ?? place.state,
      },
      include: {
        gates: true, // Include gates in the updated response
      },
    });

    return updatedPlace;
  }

  async find(id: number) {
    this.logger.log(`Find place with ID ${id}`);

    return await this.prisma.place.findFirstOrThrow({
      include: {
        gates: true,
      },
      where: {
        id: Number(id),
      },
    });
  }

  async list(query: PlacesQueryDto) {
    this.logger.log(`Listing places with filters ${JSON.stringify(query)}`);

    const page = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.name) where.name = { contains: query.name };
    if (query.address) where.address = { contains: query.address };
    if (query.city) where.city = { contains: query.city };
    if (query.state) where.state = { contains: query.state };

    let orderBy: any = {};
    if (query.order) {
      const [field, direction] = query.order.split(' ');
      orderBy = { [field]: direction };
    } else {
      orderBy = { name: 'asc' }; // Default ordering
    }

    const places = await this.prisma.place.findMany({
      where,
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
      skip: skip,
      take: limit,
      include: {
        gates: true,
      },
    });

    const totalPlaces = await this.prisma.place.count({ where });

    return {
      data: places,
      total: totalPlaces,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalPlaces / limit),
    };
  }
}
