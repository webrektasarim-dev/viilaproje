'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CallToAction() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1920"
          alt="Call to action background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Hayalinizdeki Tatil Bir Tık Uzağınızda
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Hemen rezervasyon yapın ve %20 erken rezervasyon indiriminden yararlanın!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/villas">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-4 rounded-full text-lg transition-all shadow-lg"
              >
                Villalara Göz At
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg transition-all"
              >
                İletişime Geç
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: '500+', label: 'Villa' },
              { number: '50K+', label: 'Mutlu Misafir' },
              { number: '4.9', label: 'Ortalama Puan' },
              { number: '7/24', label: 'Destek' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

