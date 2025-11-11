import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVillaDto } from './dto/create-villa.dto';
import { UpdateVillaDto } from './dto/update-villa.dto';
import { SearchVillasDto } from './dto/search-villas.dto';

@Injectable()
export class VillasService {
  constructor(private prisma: PrismaService) {}

  async findAll(searchDto: SearchVillasDto) {
    const {
      page = 1,
      limit = 12,
      city,
      country,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
      bathrooms,
      amenities,
      features,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = searchDto;

    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
    };

    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (guests) where.maxGuests = { gte: parseInt(guests as any) };
    if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms as any) };
    if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms as any) };
    
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) where.pricePerNight.gte = parseFloat(minPrice as any);
      if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice as any);
    }

    if (amenities && amenities.length > 0) {
      where.amenities = {
        some: {
          amenityId: { in: Array.isArray(amenities) ? amenities : [amenities] },
        },
      };
    }

    const [villas, total] = await Promise.all([
      this.prisma.villa.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          images: {
            where: { isMain: true },
            take: 1,
          },
          amenities: {
            include: {
              amenity: true,
            },
          },
          reviews: {
            select: {
              overallRating: true,
            },
          },
        },
      }),
      this.prisma.villa.count({ where }),
    ]);

    const villasWithRatings = villas.map((villa) => {
      const avgRating = villa.reviews.length
        ? villa.reviews.reduce((sum, r) => sum + r.overallRating, 0) / villa.reviews.length
        : 0;

      return {
        ...villa,
        averageRating: Math.round(avgRating * 10) / 10,
        reviewCount: villa.reviews.length,
        reviews: undefined,
      };
    });

    return {
      villas: villasWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findFeatured() {
    const villas = await this.prisma.villa.findMany({
      where: {
        status: 'ACTIVE',
        isFeatured: true,
      },
      take: 6,
      include: {
        images: {
          where: { isMain: true },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return villas;
  }

  async findBySlug(slug: string) {
    const villa = await this.prisma.villa.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        videos: {
          orderBy: { order: 'asc' },
        },
        amenities: {
          include: {
            amenity: true,
          },
        },
        features: {
          include: {
            feature: true,
          },
        },
        reviews: {
          where: { isPublished: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    if (!villa) {
      throw new NotFoundException('Villa bulunamadı');
    }

    const avgRating = villa.reviews.length
      ? villa.reviews.reduce((sum, r) => sum + r.overallRating, 0) / villa.reviews.length
      : 0;

    return {
      ...villa,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: villa.reviews.length,
    };
  }

  async create(createVillaDto: CreateVillaDto) {
    const slug = this.generateSlug(createVillaDto.title);

    const villa = await this.prisma.villa.create({
      data: {
        ...createVillaDto,
        slug,
      },
      include: {
        images: true,
        videos: true,
      },
    });

    return villa;
  }

  async update(id: string, updateVillaDto: UpdateVillaDto) {
    const villa = await this.prisma.villa.findUnique({ where: { id } });

    if (!villa) {
      throw new NotFoundException('Villa bulunamadı');
    }

    const updated = await this.prisma.villa.update({
      where: { id },
      data: updateVillaDto,
      include: {
        images: true,
        videos: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    return updated;
  }

  async remove(id: string) {
    const villa = await this.prisma.villa.findUnique({ where: { id } });

    if (!villa) {
      throw new NotFoundException('Villa bulunamadı');
    }

    await this.prisma.villa.delete({ where: { id } });

    return { message: 'Villa başarıyla silindi' };
  }

  async checkAvailability(slug: string, checkIn: Date, checkOut: Date) {
    const villa = await this.prisma.villa.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!villa) {
      throw new NotFoundException('Villa bulunamadı');
    }

    // Check for existing reservations
    const overlappingReservations = await this.prisma.reservation.findMany({
      where: {
        villaId: villa.id,
        status: { in: ['PENDING', 'CONFIRMED'] },
        OR: [
          {
            checkIn: { lte: checkIn },
            checkOut: { gt: checkIn },
          },
          {
            checkIn: { lt: checkOut },
            checkOut: { gte: checkOut },
          },
          {
            checkIn: { gte: checkIn },
            checkOut: { lte: checkOut },
          },
        ],
      },
    });

    const isAvailable = overlappingReservations.length === 0;

    return {
      isAvailable,
      checkIn,
      checkOut,
      message: isAvailable
        ? 'Villa seçilen tarihler için müsait'
        : 'Villa seçilen tarihler için dolu',
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim() + '-' + Date.now();
  }
}

