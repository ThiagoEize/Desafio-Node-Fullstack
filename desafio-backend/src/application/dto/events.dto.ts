import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EventsCreateDto {
  @ApiProperty()
  placeId: number;
  @ApiProperty()
  evento: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  date: Date;
}

export class EventsUpdateDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  placeId?: number;
  @ApiPropertyOptional()
  evento?: string;
  @ApiPropertyOptional()
  type?: string;
  @ApiPropertyOptional()
  date?: Date;
}

export class EventsQueryDto {
  @ApiPropertyOptional()
  placeId?: number;
  @ApiPropertyOptional()
  evento?: string;
  @ApiPropertyOptional()
  type?: string;
  @ApiPropertyOptional()
  date?: Date;
  @ApiPropertyOptional()
  order?: string;
}
