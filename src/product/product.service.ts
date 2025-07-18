import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, Catalog } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<(Product & { catalog: Catalog | null })[]> {
    return this.prisma.product.findMany({ include: { catalog: true } });
  }

  findByCatalog(catalogId: number): Promise<Product[]> {
    return this.prisma.product.findMany({ where: { catalogId } });
  }

  update(id: number, data: CreateProductDto): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  assignToCatalog(productId: number, catalogId: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data: { catalogId },
    });
  }

  removeFromCatalog(productId: number): Promise<Product> {
    return this.prisma.product.update({
      where: { id: productId },
      data: { catalogId: null },
    });
  }
}
