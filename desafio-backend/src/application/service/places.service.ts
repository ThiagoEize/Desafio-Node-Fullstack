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
      },
    });

    if (data.gates.length > 0) {
      data.gates.forEach(async (gate) => {
        await this.prisma.gate.create({
          data: {
            name: gate,
            placeId: place.id,
          },
        });
      });
    }

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

    // Extract existing gate names
    const existingGateNames = place.gates.map((gate) => gate.name);

    // Find missing gates and delete them
    const missingGates = place.gates.filter(
      (gate) => !data.gates.includes(gate.name),
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

    // Create new gates with different names
    const newGates = data.gates.filter(
      (gate) => !existingGateNames.includes(gate),
    );

    if (newGates.length > 0) {
      await Promise.all(
        newGates.map(async (gate) => {
          await this.prisma.gate.create({
            data: {
              name: gate,
              placeId: place.id,
            },
          });
        }),
      );
    }

    return await this.prisma.place.update({
      where: {
        id: Number(place.id),
      },
      data: {
        name: data.name ?? place.name,
        address: data.address ?? place.address,
        city: data.city ?? place.city,
        state: data.state ?? place.state,
      },
    });
  }

  async find(id: number) {
    // this.logger.log(`Find place with ID ${id}`);

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
    // this.logger.log(`Listing places with filters ${JSON.stringify(query)}`);

    return await this.prisma.place.findMany({
      include: {
        gates: true,
      },
      where: {
        name: {
          contains: query.name ?? undefined,
        },
        address: {
          contains: query.address ?? undefined,
        },
        city: {
          contains: query.city ?? undefined,
        },
        state: {
          contains: query.state ?? undefined,
        },
      },
    });
  }
}
