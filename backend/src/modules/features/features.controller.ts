import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeaturesService } from './features.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('features')
@Controller('features')
@Public()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm özellikleri listele' })
  async findAll() {
    return this.featuresService.findAll();
  }
}

