import { Test, TestingModule } from '@nestjs/testing';

import { EventsService } from '../application/service/events.service';
import { PlacesService } from '../application/service/places.service';
import { EventsController } from './events.controller';
import {
  EventsCreateDto,
  EventsQueryDto,
  EventsUpdateDto,
} from '../application/dto/events.dto';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: EventsService;
  let placesService: PlacesService;

  const mockEventsService = {
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    listByPlaceId: jest.fn(),
    isEventOverlapping: jest.fn(),
    eventNameExists: jest.fn(),
  };

  const mockPlacesService = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        { provide: EventsService, useValue: mockEventsService },
        { provide: PlacesService, useValue: mockPlacesService },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
    placesService = module.get<PlacesService>(PlacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find', () => {
    it('should return an event', async () => {
      const result = {
        id: 1,
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
        dateStart: new Date('2024-06-22T00:02:59.322Z'),
        dateEnd: new Date('2024-06-23T00:02:59.322Z'),
        place: {
          id: 1,
          name: 'Sample Place',
          address: '123 Main St',
          city: 'Sample City',
          state: 'Sample State',
          createdAt: new Date(),
          updatedAt: new Date(),
          gates: [],
          turnstiles: [],
        },
      };
      jest.spyOn(eventsService, 'find').mockResolvedValue(result);

      expect(await controller.find(1)).toBe(result);
    });
  });

  describe('create', () => {
    it.skip('should create a new event', async () => {
      const data: EventsCreateDto = {
        dateStart: new Date('2024-07-22T00:02:59.322Z'),
        dateEnd: new Date('2024-07-23T00:02:59.322Z'),
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
      };
      const result = {
        id: 1,
        ...data,
        place: {
          id: 1,
          name: 'Sample Place',
          address: '123 Main St',
          city: 'Sample City',
          state: 'Sample State',
          createdAt: new Date(),
          updatedAt: new Date(),
          gates: [],
          turnstiles: [],
        },
      };
      jest.spyOn(eventsService, 'create').mockResolvedValue(result);
      jest.spyOn(placesService, 'find').mockResolvedValue({
        id: 1,
        name: 'Sample Place',
        address: '123 Main St',
        city: 'Sample City',
        state: 'Sample State',
        createdAt: new Date(),
        updatedAt: new Date(),
        gates: [],
        turnstiles: [],
      });
      jest.spyOn(eventsService, 'listByPlaceId').mockResolvedValue([]);
      jest.spyOn(eventsService, 'isEventOverlapping').mockReturnValue(false);
      jest.spyOn(eventsService, 'eventNameExists').mockResolvedValue(false);

      expect(await controller.create(data)).toBe(result);
    });

    it('should throw a BadRequestException for invalid dateStart', async () => {
      const data: EventsCreateDto = {
        dateStart: new Date('invalid-date'),
        dateEnd: new Date('2024-06-23T00:02:59.322Z'),
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
      };

      await expect(controller.create(data)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw a BadRequestException for dateStart in the past', async () => {
      const data: EventsCreateDto = {
        dateStart: new Date(Date.now() - 1000),
        dateEnd: new Date(Date.now() + 10000),
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
      };

      await expect(controller.create(data)).rejects.toThrow(
        BadRequestException,
      );
    });

    it.skip('should throw a ConflictException for overlapping event', async () => {
      const data: EventsCreateDto & { id: number } = {
        dateStart: new Date('2024-07-22T00:02:59.322Z'),
        dateEnd: new Date('2024-07-23T00:02:59.322Z'),
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
        id: 1,
      };
      jest.spyOn(placesService, 'find').mockResolvedValue({
        id: 1,
        name: 'Sample Place',
        address: '123 Main St',
        city: 'Sample City',
        state: 'Sample State',
        createdAt: new Date(),
        updatedAt: new Date(),
        gates: [],
        turnstiles: [],
      });
      jest.spyOn(eventsService, 'listByPlaceId').mockResolvedValue([data]);
      jest.spyOn(eventsService, 'isEventOverlapping').mockReturnValue(true);

      await expect(controller.create(data)).rejects.toThrow(ConflictException);
    });

    it.skip('should throw a ConflictException for existing event name', async () => {
      const data: EventsCreateDto = {
        dateStart: new Date('2024-06-22T00:02:59.322Z'),
        dateEnd: new Date('2024-06-23T00:02:59.322Z'),
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
      };
      jest.spyOn(placesService, 'find').mockResolvedValue({
        id: 1,
        name: 'Sample Place',
        address: '123 Main St',
        city: 'Sample City',
        state: 'Sample State',
        createdAt: new Date(),
        updatedAt: new Date(),
        gates: [],
        turnstiles: [],
      });
      jest.spyOn(eventsService, 'listByPlaceId').mockResolvedValue([]);
      jest.spyOn(eventsService, 'isEventOverlapping').mockReturnValue(false);
      jest.spyOn(eventsService, 'eventNameExists').mockResolvedValue(true);

      await expect(controller.create(data)).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const data: EventsUpdateDto = { id: 1, event: 'Updated Event' };
      const result = {
        id: 1,
        placeId: 1,
        event: 'Updated Event',
        type: 'Updated Type',
        dateStart: new Date('2024-06-22T00:02:59.322Z'),
        dateEnd: new Date('2024-06-23T00:02:59.322Z'),
      };
      jest.spyOn(eventsService, 'update').mockResolvedValue(result);

      expect(await controller.update(1, data)).toBe(result);
    });
  });

  describe('list', () => {
    it('should return a list of events', async () => {
      const query: EventsQueryDto = {};
      const result = {
        data: [
          {
            id: 1,
            placeId: 1,
            event: 'Sample Event',
            type: 'Sample Type',
            dateStart: new Date('2024-06-22T00:02:59.322Z'),
            dateEnd: new Date('2024-06-23T00:02:59.322Z'),
          },
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      jest.spyOn(eventsService, 'list').mockResolvedValue(result);

      expect(await controller.list(query)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      const result = {
        id: 1,
        placeId: 1,
        event: 'Sample Event',
        type: 'Sample Type',
        dateStart: new Date('2024-06-22T00:02:59.322Z'),
        dateEnd: new Date('2024-06-23T00:02:59.322Z'),
      };
      jest.spyOn(eventsService, 'delete').mockResolvedValue(result);

      expect(await controller.delete(1)).toBe(result);
    });
  });
});
