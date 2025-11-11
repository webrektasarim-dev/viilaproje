import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('reviews')
@Controller('reviews')
@Public()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('villa/:villaId')
  @ApiOperation({ summary: 'Villaya ait yorumları getir' })
  async findByVilla(@Param('villaId') villaId: string) {
    return this.reviewsService.findByVilla(villaId);
  }
}

