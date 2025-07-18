import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from '@prisma/client';

@ApiTags('Catalogs')
@Controller('catalogs')
export class CatalogController {
  constructor(private readonly service: CatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new catalog' })
  @ApiResponse({
    status: 201,
    description: 'Catalog created successfully.',
    type: Object,
  })
  @ApiBody({ type: CreateCatalogDto })
  create(@Body() dto: CreateCatalogDto): Promise<Catalog> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all catalogs' })
  @ApiResponse({
    status: 200,
    description: 'List of all catalogs.',
    type: [Object],
  })
  findAll(): Promise<Catalog[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a catalog by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Catalog found.', type: Object })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Catalog | null> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a catalog by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateCatalogDto })
  @ApiResponse({
    status: 200,
    description: 'Catalog updated successfully.',
    type: Object,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCatalogDto,
  ): Promise<Catalog> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a catalog by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Catalog deleted successfully.',
    type: Object,
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Catalog> {
    return this.service.remove(id);
  }
}
