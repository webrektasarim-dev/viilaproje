'use client';

import { motion } from 'framer-motion';
import { FiShield, FiHeadphones, FiHome, FiAward, FiCreditCard, FiMapPin } from 'react-icons/fi';

const features = [
  {
    icon: FiShield,
    title: 'Güvenli Ödeme',
    description: '3D Secure ile güvenli ödeme sistemi',
  },
  {
    icon: FiHeadphones,
    title: '7/24 Destek',
    description: 'Her zaman yanınızdayız',
  },
  {
    icon: FiHome,
    title: 'Kaliteli Villalar',
    description: 'Özenle seçilmiş lüks villalar',
  },
  {
    icon: FiAward,
    title: 'En İyi Fiyat Garantisi',
    description: 'Piyasadaki en iyi fiyatlar',
  },
  {
    icon: FiCreditCard,
    title: 'Esnek Ödeme',
    description: 'Taksit ve erken rezervasyon indirimi',
  },
  {
    icon: FiMapPin,
    title: 'Geniş Lokasyon Seçeneği',
    description: 'Türkiye\'nin en güzel bölgeleri',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Neden Bizi Seçmelisiniz?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Güvenilir, kaliteli ve müşteri memnuniyeti odaklı hizmet anlayışımızla yanınızdayız
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Icon size={28} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

