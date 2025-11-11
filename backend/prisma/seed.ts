import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@villaproje.com' },
    update: {},
    create: {
      email: 'admin@villaproje.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+905551234567',
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create test user
  const testHashedPassword = await bcrypt.hash('Test123!', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@villaproje.com' },
    update: {},
    create: {
      email: 'test@villaproje.com',
      password: testHashedPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '+905559876543',
      role: 'USER',
      isEmailVerified: true,
    },
  });

  console.log('✅ Test user created:', testUser.email);

  // Create amenities
  const amenities = [
    { name: 'WiFi', icon: '📶', category: 'general' },
    { name: 'Klima', icon: '❄️', category: 'general' },
    { name: 'Isıtma', icon: '🔥', category: 'general' },
    { name: 'TV', icon: '📺', category: 'entertainment' },
    { name: 'Çamaşır Makinesi', icon: '🧺', category: 'general' },
    { name: 'Bulaşık Makinesi', icon: '🍽️', category: 'kitchen' },
    { name: 'Mikrodalga', icon: '🔄', category: 'kitchen' },
    { name: 'Kahve Makinesi', icon: '☕', category: 'kitchen' },
    { name: 'Özel Havuz', icon: '🏊', category: 'outdoor' },
    { name: 'Bahçe', icon: '🌳', category: 'outdoor' },
    { name: 'Barbekü', icon: '🍖', category: 'outdoor' },
    { name: 'Otopark', icon: '🚗', category: 'general' },
  ];

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { name: amenity.name },
      update: {},
      create: amenity,
    });
  }

  console.log('✅ Amenities created');

  // Create features
  const features = [
    { name: 'Deniz Manzarası', icon: '🌊' },
    { name: 'Dağ Manzarası', icon: '⛰️' },
    { name: 'Plaja Yakın', icon: '🏖️' },
    { name: 'Şehir Merkezine Yakın', icon: '🏙️' },
    { name: 'Aile Dostu', icon: '👨‍👩‍👧‍👦' },
    { name: 'Lüks Villa', icon: '💎' },
  ];

  for (const feature of features) {
    await prisma.feature.upsert({
      where: { name: feature.name },
      update: {},
      create: feature,
    });
  }

  console.log('✅ Features created');

  // Create sample villas
  const sampleVillas = [
    {
      title: 'Villa Deniz Manzaralı Lüks',
      slug: 'villa-deniz-manzarali-luks-' + Date.now(),
      description: 'Muhteşem deniz manzaralı, modern ve lüks villa. 4 yatak odası, 3 banyo, özel havuz ve bahçe. Plaja sadece 200m mesafede.',
      shortDescription: 'Deniz manzaralı lüks villa, özel havuz',
      country: 'Türkiye',
      city: 'Antalya',
      region: 'Kaş',
      address: 'Kalkan Mahallesi, Deniz Sokak No:5',
      latitude: 36.2022,
      longitude: 29.4182,
      propertyType: 'villa',
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      area: 250,
      pricePerNight: 350,
      cleaningFee: 100,
      securityDeposit: 500,
      status: 'ACTIVE',
      isFeatured: true,
      isInstantBook: true,
      minStay: 3,
      allowPets: false,
      allowSmoking: false,
      allowEvents: true,
      allowChildren: true,
    },
    {
      title: 'Villa Panorama Bodrum',
      slug: 'villa-panorama-bodrum-' + Date.now(),
      description: 'Bodrum\'da panoramik manzaralı muhteşem villa. 5 yatak odası, infinity havuz, modern tasarım.',
      shortDescription: 'Panoramik manzaralı villa',
      country: 'Türkiye',
      city: 'Bodrum',
      region: 'Yalıkavak',
      address: 'Yalıkavak Marina, Tepemevki',
      latitude: 37.0886,
      longitude: 27.4306,
      propertyType: 'villa',
      maxGuests: 10,
      bedrooms: 5,
      bathrooms: 4,
      area: 350,
      pricePerNight: 500,
      cleaningFee: 150,
      securityDeposit: 1000,
      status: 'ACTIVE',
      isFeatured: true,
      isInstantBook: false,
      minStay: 5,
      allowPets: false,
      allowSmoking: false,
      allowEvents: false,
      allowChildren: true,
    },
    {
      title: 'Villa Zeytinlik Fethiye',
      slug: 'villa-zeytinlik-fethiye-' + Date.now(),
      description: 'Zeytinlik içinde huzurlu villa. Doğa ile iç içe, modern konfora sahip.',
      shortDescription: 'Doğa içinde huzurlu villa',
      country: 'Türkiye',
      city: 'Fethiye',
      region: 'Ölüdeniz',
      address: 'Ölüdeniz Mevkii',
      latitude: 36.5453,
      longitude: 29.1167,
      propertyType: 'villa',
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      pricePerNight: 250,
      cleaningFee: 80,
      securityDeposit: 400,
      status: 'ACTIVE',
      isFeatured: true,
      isInstantBook: true,
      minStay: 2,
      allowPets: true,
      allowSmoking: false,
      allowEvents: false,
      allowChildren: true,
    },
  ];

  for (const villaData of sampleVillas) {
    const villa = await prisma.villa.create({
      data: villaData,
    });

    // Add sample image
    await prisma.villaImage.create({
      data: {
        villaId: villa.id,
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        alt: villa.title,
        order: 0,
        isMain: true,
      },
    });

    console.log('✅ Villa created:', villa.title);
  }

  console.log('✅ Sample villas created');

  // Create promo code
  await prisma.promoCode.create({
    data: {
      code: 'SUMMER2024',
      description: 'Yaz kampanyası %20 indirim',
      discountType: 'percentage',
      discountValue: 20,
      minAmount: 500,
      maxDiscount: 200,
      maxUses: 100,
      usedCount: 0,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-09-30'),
      isActive: true,
    },
  });

  console.log('✅ Promo code created');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

