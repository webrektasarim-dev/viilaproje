import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StripeService } from './stripe.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private stripeService: StripeService,
  ) {}

  async createPaymentIntent(reservationId: string, userId: string) {
    const reservation = await this.prisma.reservation.findFirst({
      where: { id: reservationId, userId },
      include: { villa: true },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervasyon bulunamadı');
    }

    // Stripe PaymentIntent oluştur
    const paymentIntent = await this.stripeService.createPaymentIntent(
      reservation.totalPrice.toNumber(),
      'EUR',
      {
        reservationId: reservation.id,
        villaTitle: reservation.villa.title,
        customerEmail: reservation.guestEmail,
      },
    );

    // Payment kaydı oluştur
    const payment = await this.prisma.payment.create({
      data: {
        reservationId: reservation.id,
        amount: reservation.totalPrice,
        currency: 'EUR',
        status: 'PENDING',
        paymentMethod: 'stripe',
        paymentProvider: 'stripe',
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return {
      payment,
      clientSecret: paymentIntent.client_secret,
    };
  }

  async confirmPayment(paymentIntentId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!payment) {
      throw new NotFoundException('Ödeme bulunamadı');
    }

    // Payment ve Reservation güncelle
    await this.prisma.$transaction([
      this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      }),
      this.prisma.reservation.update({
        where: { id: payment.reservationId },
        data: {
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
        },
      }),
    ]);

    return { success: true, message: 'Ödeme başarıyla tamamlandı' };
  }
}

