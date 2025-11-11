'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Ayşe Yılmaz',
    location: 'İstanbul',
    rating: 5,
    comment: 'Harika bir tatil geçirdik! Villa çok temiz ve konforlu. Deniz manzarası muhteşemdi. Kesinlikle tekrar geleceğiz.',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Mehmet Demir',
    location: 'Ankara',
    rating: 5,
    comment: 'Müşteri hizmetleri çok ilgiliydi. Villada eksik bir şey yoktu. Fiyat-performans açısından mükemmel.',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    name: 'Zeynep Kaya',
    location: 'İzmir',
    rating: 5,
    comment: 'Ailemle harika vakit geçirdik. Havuz ve bahçe çocuklar için harikaydı. Teşekkürler!',
    image: 'https://i.pravatar.cc/150?img=5',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Misafirlerimiz Ne Diyor?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Binlerce mutlu misafirimizin deneyimlerinden bazıları
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                ))}
              </div>

              <p className="text-gray-700 italic">"{testimonial.comment}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

