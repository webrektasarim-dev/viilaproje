import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @ApiProperty({ example: 'clxxx123456789' })
  @IsString()
  villaId: string;

  @ApiProperty({ example: '2024-07-01' })
  @IsDateString()
  checkIn: string;

  @ApiProperty({ example: '2024-07-08' })
  @IsDateString()
  checkOut: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  guests: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  adults: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  children: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  infants: number;

  @ApiProperty({ example: 'Erken check-in istiyoruz', required: false })
  @IsOptional()
  @IsString()
  specialRequests?: string;

  @ApiProperty({ example: 'SUMMER2024', required: false })
  @IsOptional()
  @IsString()
  promoCode?: string;
}

