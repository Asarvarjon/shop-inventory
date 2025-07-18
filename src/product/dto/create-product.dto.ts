import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'iPhone 14',
    description: 'Name of the product',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 999.99,
    description: 'Price of the product in USD',
  })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Optional ID of the catalog this product belongs to',
  })
  @IsOptional()
  @IsNumber()
  catalogId?: number;
}
