import { Controller, Get, Post, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('reservations')
@Controller('reservations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni rezervasyon oluştur' })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationsService.create(userId, createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Kullanıcının rezervasyonlarını listele' })
  async findUserReservations(@CurrentUser('id') userId: string) {
    return this.reservationsService.findUserReservations(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Rezervasyon detayını getir' })
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.reservationsService.findOne(id, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rezervasyonu iptal et' })
  async cancel(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('reason') reason: string,
  ) {
    return this.reservationsService.cancel(id, userId, reason);
  }
}

