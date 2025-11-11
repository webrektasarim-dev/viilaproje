'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              🏡 VillaProje
            </h3>
            <p className="mb-6">
              Türkiye'nin en güzel lokasyonlarında lüks villa kiralama hizmeti sunuyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiInstagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FiTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/villas" className="hover:text-white transition-colors">
                  Villalar
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  SSS
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Yasal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="hover:text-white transition-colors">
                  İptal Politikası
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="hover:text-white transition-colors">
                  KVKK
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mr-2 mt-1 flex-shrink-0" />
                <span>Atatürk Cad. No:123<br />Antalya, Türkiye</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                <a href="tel:+905551234567" className="hover:text-white transition-colors">
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2" />
                <a href="mailto:info@villaproje.com" className="hover:text-white transition-colors">
                  info@villaproje.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>© {currentYear} VillaProje. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

