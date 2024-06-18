import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlacesCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiPropertyOptional()
  gates: string[];
}

export class PlacesUpdateDto {
  @ApiProperty()
  id: number;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  city: string;
  @ApiPropertyOptional()
  state: string;
  @ApiPropertyOptional()
  gates: string[];
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
}
