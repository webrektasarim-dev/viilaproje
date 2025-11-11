# 🏡 Villa Kiralama Sitesi - Kurulum Kılavuzu

Emma Villas tarzında profesyonel villa kiralama platformu kurulum adımları.

## 📋 Gereksinimler

- **Node.js** 20.x veya üzeri
- **Docker Desktop** (PostgreSQL ve Redis için)
- **Git**

## 🚀 Hızlı Başlangıç

### 1. Docker Servislerini Başlatın

```bash
docker-compose up -d
```

Bu komut şu servisleri başlatacak:
- PostgreSQL (Port: 5432)
- Redis (Port: 6379)

### 2. Backend Kurulumu

```bash
cd backend

# Bağımlılıkları yükleyin
npm install

# Prisma client oluşturun
npx prisma generate

# Veritabanı migration'larını çalıştırın
npx prisma migrate dev --name init

# Test verilerini yükleyin (opsiyonel)
npm run prisma:seed

# Backend'i başlatın
npm run start:dev
```

Backend şu adreste çalışacak: **http://localhost:3000**
Swagger API Docs: **http://localhost:3000/api/docs**

#### Backend .env Dosyası

`backend/.env` dosyası zaten oluşturulmuş. Gerekirse düzenleyebilirsiniz:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/villaproje
REDIS_URL=redis://localhost:6379
JWT_SECRET=VillaProjeSecretKey2024!ChangeMeInProduction
JWT_REFRESH_SECRET=VillaProjeRefreshSecretKey2024!ChangeMeInProduction
STRIPE_SECRET_KEY=sk_test_your_key  # Stripe için gerçek key gerekli
```

### 3. Frontend Kurulumu

```bash
cd frontend

# Bağımlılıkları yükleyin
npm install

# .env.local dosyası oluşturun
cp .env.local.example .env.local

# Frontend'i başlatın
npm run dev
```

Frontend şu adreste çalışacak: **http://localhost:3001**

#### Frontend .env.local Dosyası

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### 4. Admin Panel Kurulumu (Opsiyonel)

Admin panel için ayrı bir Next.js projesi oluşturabilirsiniz veya frontend içinde admin route'ları ekleyebilirsiniz.

## 🔑 Test Hesapları

Backend seed komutu (`npm run prisma:seed`) çalıştırıldığında şu hesaplar oluşturulur:

### Admin Hesabı
- **Email:** admin@villaproje.com
- **Şifre:** Admin123!

### Test Kullanıcı
- **Email:** test@villaproje.com
- **Şifre:** Test123!

## 📦 Proje Yapısı

```
villaproje/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── modules/      # API modülleri
│   │   ├── prisma/       # Veritabanı
│   │   └── main.ts
│   └── prisma/
│       └── schema.prisma
│
├── frontend/             # Next.js Kullanıcı Sitesi
│   ├── app/              # Next.js 14 App Router
│   ├── components/       # React component'ları
│   │   ├── home/        # Ana sayfa component'ları
│   │   │   ├── VideoHero.tsx
│   │   │   ├── SearchSection.tsx
│   │   │   └── FeaturedVillas.tsx
│   │   └── layout/
│   └── lib/             # Utility fonksiyonlar
│
└── docker-compose.yml   # Docker servisleri
```

## 🎨 Özellikler

### ✅ Tamamlanan Özellikler

#### Backend
- ✅ NestJS + TypeScript
- ✅ Prisma ORM + PostgreSQL
- ✅ JWT Authentication
- ✅ Villa CRUD API
- ✅ Rezervasyon Sistemi
- ✅ Ödeme Entegrasyonu (Stripe)
- ✅ Dosya Yükleme
- ✅ Swagger API Dokümantasyonu

#### Frontend
- ✅ Next.js 14 + TypeScript
- ✅ **Video Hero Component** (Emma Villas stili)
- ✅ Modern ve responsive tasarım
- ✅ Tailwind CSS
- ✅ Framer Motion animasyonlar
- ✅ Villa arama ve filtreleme
- ✅ Villa listeleme
- ✅ React Query (veri yönetimi)

### 🎥 Video Hero Özellikleri

Ana sayfadaki video hero component:
- Tam ekran video arka plan
- Otomatik oynatma (autoplay)
- Play/Pause kontrolü
- Smooth scroll indicator
- Responsive tasarım
- Overlay efektleri

## 🔧 Geliştirme Komutları

### Backend

```bash
npm run start:dev          # Development mode
npm run build             # Production build
npm run start:prod        # Production mode
npm run prisma:studio     # Prisma Studio (DB GUI)
npm run prisma:seed       # Test verilerini yükle
```

### Frontend

```bash
npm run dev              # Development mode
npm run build           # Production build
npm run start           # Production mode
npm run lint            # ESLint kontrolü
```

## 🐳 Docker Komutları

```bash
# Servisleri başlat
docker-compose up -d

# Servisleri durdur
docker-compose down

# Logları görüntüle
docker-compose logs -f

# Veritabanını sıfırla (DİKKAT: Tüm veriler silinir!)
docker-compose down -v
docker-compose up -d
```

## 📊 Veritabanı Yönetimi

### Prisma Studio
Görsel veritabanı yönetimi için:

```bash
cd backend
npx prisma studio
```

http://localhost:5555 adresinde açılır.

### Migration Oluşturma

Schema değişikliği yaptıktan sonra:

```bash
npx prisma migrate dev --name migration_ismi
```

## 🔐 Güvenlik

Production ortamında mutlaka değiştirin:
- JWT secrets
- Database şifresi
- Stripe API keys
- CORS origin ayarları

## 🌐 Production Deployment

### Backend (Heroku, Railway, DigitalOcean)

1. Environment variables ayarlayın
2. PostgreSQL ve Redis servislerini ayarlayın
3. Build ve deploy:

```bash
npm run build
npm run start:prod
```

### Frontend (Vercel, Netlify)

1. Environment variables ayarlayın
2. Build:

```bash
npm run build
```

3. Deploy edilen backend URL'ini `NEXT_PUBLIC_API_URL`'e ekleyin

## 🆘 Sorun Giderme

### Port zaten kullanılıyor

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### Docker sorunları

```bash
# Tüm container'ları temizle
docker system prune -a

# Yeniden başlat
docker-compose down
docker-compose up -d
```

### Prisma sorunları

```bash
# Client'ı yeniden oluştur
npx prisma generate

# Veritabanını sıfırla ve yeniden oluştur
npx prisma migrate reset
```

## 📞 Destek

Sorun yaşarsanız:
1. GitHub Issues açın
2. Logları kontrol edin (`docker-compose logs`)
3. .env dosyalarını kontrol edin

## 📝 Lisans

MIT License

---

**Oluşturan:** AI Assistant
**Tarih:** 2024
**Proje:** Villa Kiralama Platformu (Emma Villas tarzı)

