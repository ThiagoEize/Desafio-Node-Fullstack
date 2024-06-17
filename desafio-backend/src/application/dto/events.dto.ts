import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventsCreateDto {
  @ApiProperty()
  placeId: number;
  @ApiProperty()
  event: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  dateStart: Date;
  @ApiProperty()
  hourStart: string;
  @ApiProperty()
  dateEnd: Date;
  @ApiProperty()
  hourEnd: string;
}

export class EventsUpdateDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  placeId?: number;
  @ApiPropertyOptional()
  event?: string;
  @ApiPropertyOptional()
  type?: string;
  @ApiPropertyOptional()
  dateStart?: Date;
  @ApiPropertyOptional()
  hourStart?: string;
  @ApiPropertyOptional()
  dateEnd?: Date;
  @ApiPropertyOptional()
  hourEnd?: string;
}

export class EventsQueryDto {
  @ApiPropertyOptional()
  placeId?: number;
  @ApiPropertyOptional()
  event?: string;
  @ApiPropertyOptional()
  type?: string;
  @ApiPropertyOptional()
  dateStart?: Date;
  @ApiPropertyOptional()
  hourStart?: string;
  @ApiPropertyOptional()
  dateEnd?: Date;
  @ApiPropertyOptional()
  hourEnd?: string;
  @ApiPropertyOptional()
  order?: string;
}
