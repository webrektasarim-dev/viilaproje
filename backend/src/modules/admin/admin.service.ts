import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalVillas, totalReservations, totalUsers, totalRevenue] = await Promise.all([
      this.prisma.villa.count(),
      this.prisma.reservation.count(),
      this.prisma.user.count(),
      this.prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalVillas,
      totalReservations,
      totalUsers,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }

  async getRecentReservations() {
    return this.prisma.reservation.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        villa: {
          select: {
            title: true,
            slug: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }
}

