'use client';

import { motion } from 'framer-motion';
import { FiPlay, FiPause } from 'react-icons/fi';
import { useState, useRef } from 'react';

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover"
          poster="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-luxury-villa-with-pool-6008/1080p.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920"
            alt="Villa"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Özel Bir Villa,
              <br />
              <span className="text-yellow-400">Hayalinizdeki Tatil</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Türkiye'nin en güzel lokasyonlarında lüks villalar.
              <br />
              Deniz, doğa ve huzurun tadını çıkarın.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg"
              onClick={() => {
                const element = document.getElementById('search-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Villalari Keşfet
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
      </button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}

