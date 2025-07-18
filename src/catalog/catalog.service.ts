import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog, Product } from '@prisma/client';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCatalogDto): Promise<Catalog> {
    return this.prisma.catalog.create({ data });
  }

  findAll(): Promise<(Catalog & { products: Product[] })[]> {
    return this.prisma.catalog.findMany({ include: { products: true } });
  }

  findOne(id: number): Promise<(Catalog & { products: Product[] }) | null> {
    return this.prisma.catalog.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  update(id: number, data: CreateCatalogDto): Promise<Catalog> {
    return this.prisma.catalog.update({ where: { id }, data });
  }

  remove(id: number): Promise<Catalog> {
    return this.prisma.catalog.delete({ where: { id } });
  }
}
