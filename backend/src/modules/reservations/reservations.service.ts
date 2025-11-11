import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReservationDto: CreateReservationDto) {
    const { villaId, checkIn, checkOut, guests, adults, children, infants } = createReservationDto;

    // Villa kontrolü
    const villa = await this.prisma.villa.findUnique({ where: { id: villaId } });
    if (!villa) {
      throw new NotFoundException('Villa bulunamadı');
    }

    // Misafir sayısı kontrolü
    if (guests > villa.maxGuests) {
      throw new BadRequestException(`Bu villa maksimum ${villa.maxGuests} misafir alabilir`);
    }

    // Tarih kontrolü
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (checkInDate >= checkOutDate) {
      throw new BadRequestException('Check-out tarihi check-in tarihinden sonra olmalıdır');
    }

    // Müsaitlik kontrolü
    const overlapping = await this.prisma.reservation.findFirst({
      where: {
        villaId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            checkIn: { lte: checkInDate },
            checkOut: { gt: checkInDate },
          },
          {
            checkIn: { lt: checkOutDate },
            checkOut: { gte: checkOutDate },
          },
        ],
      },
    });

    if (overlapping) {
      throw new BadRequestException('Villa seçilen tarihler için müsait değil');
    }

    // Fiyat hesaplama
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = villa.pricePerNight.toNumber() * totalNights;
    const cleaningFee = villa.cleaningFee?.toNumber() || 0;
    const serviceFee = subtotal * 0.1; // %10 servis ücreti
    const totalPrice = subtotal + cleaningFee + serviceFee;

    // Rezervasyon oluştur
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    const reservation = await this.prisma.reservation.create({
      data: {
        villaId,
        userId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        adults,
        children,
        infants,
        pricePerNight: villa.pricePerNight,
        totalNights,
        subtotal,
        cleaningFee,
        serviceFee,
        totalPrice,
        guestName: `${user.firstName} ${user.lastName}`,
        guestEmail: user.email,
        guestPhone: user.phone || '',
        specialRequests: createReservationDto.specialRequests,
      },
      include: {
        villa: {
          select: {
            title: true,
            slug: true,
            images: {
              where: { isMain: true },
              take: 1,
            },
          },
        },
      },
    });

    return reservation;
  }

  async findUserReservations(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: {
        villa: {
          select: {
            title: true,
            slug: true,
            city: true,
            images: {
              where: { isMain: true },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id, userId },
      include: {
        villa: {
          include: {
            images: {
              where: { isMain: true },
              take: 1,
            },
          },
        },
        payments: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı');
    }

    return reservation;
  }

  async cancel(id: string, userId: string, reason: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id, userId },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı');
    }

    if (reservation.status === 'CANCELLED') {
      throw new BadRequestException('Bu rezervasyon zaten iptal edilmiş');
    }

    const updated = await this.prisma.reservation.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: reason,
      },
    });

    return updated;
  }
}

