'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiUsers, FiBed, FiStar } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function FeaturedVillas() {
  const { data: villas, isLoading } = useQuery({
    queryKey: ['featured-villas'],
    queryFn: async () => {
      const response = await api.get('/villas/featured');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">
            Yükleniyor...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-lg mb-4" />
                <div className="bg-gray-200 h-6 rounded w-3/4 mb-2" />
                <div className="bg-gray-200 h-4 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
            Öne Çıkan Villalar
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            En popüler ve beğenilen villalarımızı keşfedin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas?.map((villa: any, index: number) => (
            <motion.div
              key={villa.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/villa/${villa.slug}`}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={villa.images[0]?.url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'}
                      alt={villa.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {villa.isFeatured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ Öne Çıkan
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {villa.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <FiMapPin className="mr-1" size={16} />
                      <span>{villa.city}, {villa.country}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FiUsers className="mr-1" />
                        {villa.maxGuests} Misafir
                      </div>
                      <div className="flex items-center">
                        <FiBed className="mr-1" />
                        {villa.bedrooms} Yatak Odası
                      </div>
                      <div className="flex items-center">
                        <FiStar className="mr-1 text-yellow-400" />
                        {villa.averageRating || 5.0}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          €{villa.pricePerNight}
                        </span>
                        <span className="text-gray-500"> / gece</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold"
                      >
                        Detaylar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/villas">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-semibold"
            >
              Tüm Villaları Gör
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

