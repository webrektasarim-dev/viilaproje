import { IsString, IsNumber, IsBoolean, IsOptional, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVillaDto {
  @ApiProperty({ example: 'Lüks Villa Deniz Manzaralı' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Deniz manzaralı lüks villa...' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Havuzlu, deniz manzaralı villa', required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: 'Türkiye' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Antalya' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Kaş', required: false })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiProperty({ example: 'Kalkan Mah. Deniz Sok. No:5' })
  @IsString()
  address: string;

  @ApiProperty({ example: 36.2022, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  latitude?: number;

  @ApiProperty({ example: 29.4182, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  longitude?: number;

  @ApiProperty({ example: 'villa' })
  @IsString()
  propertyType: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  maxGuests: number;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  bedrooms: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  bathrooms: number;

  @ApiProperty({ example: 250, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  area?: number;

  @ApiProperty({ example: 350.00 })
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  pricePerNight: number;

  @ApiProperty({ example: 100.00, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cleaningFee?: number;

  @ApiProperty({ example: 500.00, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  securityDeposit?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isInstantBook?: boolean;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minStay?: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxStay?: number;

  @ApiProperty({ example: '15:00', required: false })
  @IsOptional()
  @IsString()
  checkInTime?: string;

  @ApiProperty({ example: '11:00', required: false })
  @IsOptional()
  @IsString()
  checkOutTime?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  allowPets?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  allowSmoking?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  allowEvents?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  allowChildren?: boolean;
}

