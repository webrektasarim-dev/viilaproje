'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiUsers, FiBed, FiStar, FiFilter } from 'react-icons/fi';

export default function VillasPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    guests: '',
    bedrooms: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['villas', page, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '12');
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.guests) params.append('guests', filters.guests);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      
      const response = await api.get(`/villas?${params.toString()}`);
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="font-serif text-5xl font-bold text-center mb-4">
            Tüm Villalar
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {data?.pagination.total || 0} villa bulundu
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter size={20} />
            <h3 className="font-bold text-lg">Filtreler</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Şehir"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Min Fiyat"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Max Fiyat"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={filters.guests}
              onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Misafir Sayısı</option>
              {[2, 4, 6, 8, 10].map((n) => (
                <option key={n} value={n}>{n}+ Kişi</option>
              ))}
            </select>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Yatak Odası</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}+ Oda</option>
              ))}
            </select>
          </div>
        </div>

        {/* Villas Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-56 rounded-lg mb-3" />
                <div className="bg-gray-200 h-6 rounded mb-2" />
                <div className="bg-gray-200 h-4 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.villas.map((villa: any, index: number) => (
                <motion.div
                  key={villa.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/villa/${villa.slug}`}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                      <div className="relative h-56">
                        <Image
                          src={villa.images[0]?.url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'}
                          alt={villa.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {villa.title}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <FiMapPin className="mr-1" size={14} />
                          {villa.city}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="flex items-center"><FiUsers className="mr-1" />{villa.maxGuests}</span>
                          <span className="flex items-center"><FiBed className="mr-1" />{villa.bedrooms}</span>
                          <span className="flex items-center"><FiStar className="mr-1 text-yellow-400" />{villa.averageRating || 5.0}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                          <div>
                            <span className="text-xl font-bold text-blue-600">€{villa.pricePerNight}</span>
                            <span className="text-gray-500 text-sm"> / gece</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {data?.pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(data.pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

