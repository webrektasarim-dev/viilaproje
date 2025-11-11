import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.feature.findMany({
      orderBy: { name: 'asc' },
    });
  }
}

