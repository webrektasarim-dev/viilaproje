import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent/:reservationId')
  @ApiOperation({ summary: 'Ödeme intent oluştur' })
  async createPaymentIntent(
    @Param('reservationId') reservationId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentsService.createPaymentIntent(reservationId, userId);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Ödemeyi onayla' })
  async confirmPayment(@Body('paymentIntentId') paymentIntentId: string) {
    return this.paymentsService.confirmPayment(paymentIntentId);
  }
}

