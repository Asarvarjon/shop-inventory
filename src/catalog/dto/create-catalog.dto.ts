import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Name of the catalog',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
