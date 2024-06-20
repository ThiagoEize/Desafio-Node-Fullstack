import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GateDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  placeId?: number;

  @ApiProperty()
  name: string;
}

class TurnstileDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  placeId?: number;

  @ApiProperty()
  name: string;
}

export class PlacesCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiPropertyOptional({ type: [GateDto] })
  gates?: GateDto[];
  @ApiPropertyOptional({ type: [TurnstileDto] })
  turnstiles?: TurnstileDto[];
}

export class PlacesUpdateDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  address?: string;
  @ApiPropertyOptional()
  city?: string;
  @ApiPropertyOptional()
  state?: string;
  @ApiPropertyOptional({ type: [GateDto] })
  gates?: GateDto[];
  @ApiPropertyOptional({ type: [TurnstileDto] })
  turnstiles?: TurnstileDto[];
}

export class PlacesQueryDto {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  address?: string;
  @ApiPropertyOptional()
  city?: string;
  @ApiPropertyOptional()
  state?: string;
  @ApiPropertyOptional()
  order?: string;
  @ApiPropertyOptional()
  page?: number;
  @ApiPropertyOptional()
  limit?: number;
  @ApiPropertyOptional()
  search?: string; // Add this line to include the search property
}
