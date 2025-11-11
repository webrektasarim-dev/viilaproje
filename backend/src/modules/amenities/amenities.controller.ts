import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AmenitiesService } from './amenities.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('amenities')
@Controller('amenities')
@Public()
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm olanakları listele' })
  async findAll(@Query('category') category?: string) {
    if (category) {
      return this.amenitiesService.findByCategory(category);
    }
    return this.amenitiesService.findAll();
  }
}

