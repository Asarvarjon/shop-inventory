import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get('/catalog/:catalogId')
  @ApiOperation({ summary: 'Get products by catalog ID' })
  @ApiParam({ name: 'catalogId', type: Number })
  findByCatalog(
    @Param('catalogId', ParseIntPipe) catalogId: number,
  ): Promise<Product[]> {
    return this.service.findByCatalog(catalogId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateProductDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProductDto,
  ): Promise<Product> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.service.remove(id);
  }

  @Patch(':id/assign/:catalogId')
  @ApiOperation({ summary: 'Assign product to a catalog' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'catalogId', type: Number })
  assignToCatalog(
    @Param('id', ParseIntPipe) id: number,
    @Param('catalogId', ParseIntPipe) catalogId: number,
  ): Promise<Product> {
    return this.service.assignToCatalog(id, catalogId);
  }

  @Patch(':id/remove')
  @ApiOperation({ summary: 'Remove product from its catalog' })
  @ApiParam({ name: 'id', type: Number })
  removeFromCatalog(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.service.removeFromCatalog(id);
  }
}
