import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VillasService } from './villas.service';
import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { SearchVillasDto } from './dto/search-villas.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('villas')
@Controller('villas')
export class VillasController {
  constructor(private readonly villasService: VillasService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Tüm villaları listele (filtreleme ve sayfalama ile)' })
  @ApiResponse({ status: 200, description: 'Villa listesi başarıyla getirildi' })
  async findAll(@Query() searchDto: SearchVillasDto) {
    return this.villasService.findAll(searchDto);
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Öne çıkan villaları getir' })
  async findFeatured() {
    return this.villasService.findFeatured();
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Villa detaylarını getir' })
  @ApiResponse({ status: 200, description: 'Villa detayları getirildi' })
  @ApiResponse({ status: 404, description: 'Villa bulunamadı' })
  async findOne(@Param('slug') slug: string) {
    return this.villasService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yeni villa oluştur (Sadece admin)' })
  @ApiResponse({ status: 201, description: 'Villa başarıyla oluşturuldu' })
  @ApiResponse({ status: 403, description: 'Yetkiniz yok' })
  async create(@Body() createVillaDto: CreateVillaDto) {
    return this.villasService.create(createVillaDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Villa bilgilerini güncelle (Sadece admin)' })
  @ApiResponse({ status: 200, description: 'Villa güncellendi' })
  @ApiResponse({ status: 404, description: 'Villa bulunamadı' })
  async update(@Param('id') id: string, @Body() updateVillaDto: UpdateVillaDto) {
    return this.villasService.update(id, updateVillaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Villa sil (Sadece admin)' })
  @ApiResponse({ status: 200, description: 'Villa silindi' })
  async remove(@Param('id') id: string) {
    return this.villasService.remove(id);
  }

  @Public()
  @Get(':slug/availability')
  @ApiOperation({ summary: 'Villa müsaitlik durumunu kontrol et' })
  async checkAvailability(
    @Param('slug') slug: string,
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string,
  ) {
    return this.villasService.checkAvailability(slug, new Date(checkIn), new Date(checkOut));
  }
}

