'use client';

import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchSection() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('city', location);
    if (guests) params.append('guests', guests.toString());
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    
    router.push(`/villas?${params.toString()}`);
  };

  return (
    <section id="search-section" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
            Hayalinizdeki Villayı Bulun
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Binlerce villa arasından size en uygun olanı seçin
          </p>

          <form
            onSubmit={handleSearch}
            className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Location */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiMapPin className="inline mr-2" />
                  Konum
                </label>
                <input
                  type="text"
                  placeholder="Antalya, Bodrum..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Check-in */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Giriş
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Check-out */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Çıkış
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Guests */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FiUsers className="inline mr-2" />
                  Misafir
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Kişi' : 'Kişi'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg transition-all shadow-lg"
            >
              Villa Ara
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

