# 🏡 Villa Kiralama Sitesi - Türkçe Kurulum Rehberi

## 📦 İhtiyaçlar

1. **Node.js 20.x** - https://nodejs.org/
2. **Docker Desktop** - https://www.docker.com/products/docker-desktop/
3. **Git** - Zaten OneDrive'da varsa gerek yok

## 🚀 Adım Adım Kurulum

### 1️⃣ Docker'ı Başlat

Önce Docker Desktop'ı açın, sonra terminal'de:

```powershell
cd C:\websiteler\villaproje
docker-compose up -d
```

Bu komut PostgreSQL ve Redis'i başlatacak.

Kontrol: `docker ps` komutu ile container'ları görebilirsiniz.

### 2️⃣ Backend'i Başlat

Yeni bir terminal açın (PowerShell):

```powershell
cd C:\websiteler\villaproje\backend

# Paketleri yükle
npm install

# Veritabanı hazırla
npx prisma generate
npx prisma migrate dev --name init

# Test verilerini yükle (3 örnek villa, admin ve test kullanıcı)
npx prisma:seed

# Backend'i çalıştır
npm run start:dev
```

✅ Backend çalışıyor mu? → http://localhost:3000/api/docs (Swagger açılmalı)

### 3️⃣ Frontend'i Başlat  

Yeni bir terminal daha açın:

```powershell
cd C:\websiteler\villaproje\frontend

# Paketleri yükle
npm install

# .env.local dosyası oluştur
echo "NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1" > .env.local

# Frontend'i çalıştır
npm run dev
```

✅ Frontend çalışıyor mu? → http://localhost:3001

### 4️⃣ Admin Panel (Opsiyonel)

İsterseniz admin panel için:

```powershell
cd C:\websiteler\villaproje\admin
npm install
npm run dev
```

Admin Panel: http://localhost:3002

## 🎯 Hemen Test Et!

### 1. Ana Sayfa
http://localhost:3001 adresine git

**Görecekleriniz:**
- ✅ Video Hero (Otomatik oynatılan lüks villa videosu)
- ✅ Arama Formu
- ✅ Öne Çıkan Villalar (3 örnek villa)
- ✅ Özellikler bölümü
- ✅ Müşteri yorumları
- ✅ Call-to-action

### 2. Villa Listeleme
http://localhost:3001/villas

- ✅ Filtreler (şehir, fiyat, misafir sayısı)
- ✅ 3 örnek villa kartı
- ✅ Modern tasarım

### 3. API Test
http://localhost:3000/api/docs

**Swagger ile test edebilirsiniz:**
- GET /api/v1/villas - Tüm villalar
- GET /api/v1/villas/featured - Öne çıkan villalar
- POST /api/v1/auth/login - Giriş yap

## 🔐 Test Hesapları

Backend'de hazır hesaplar var (seed ile oluştu):

**Admin:**
- Email: admin@villaproje.com  
- Şifre: Admin123!

**Normal Kullanıcı:**
- Email: test@villaproje.com
- Şifre: Test123!

## 🎬 Video Hero Özellikleri

Ana sayfadaki video bölümü Emma Villas sitesi gibi:
- ✅ Otomatik oynatılan video arka plan
- ✅ Play/Pause butonu
- ✅ Smooth scroll indicator
- ✅ Overlay efektleri
- ✅ Responsive (mobil uyumlu)

## 📂 Proje Yapısı

```
C:\websiteler\villaproje\
├── backend/           → NestJS API (Port: 3000)
│   ├── src/
│   │   ├── modules/   → API modülleri
│   │   │   ├── auth/
│   │   │   ├── villas/
│   │   │   ├── reservations/
│   │   │   └── payments/
│   │   └── prisma/    → Veritabanı
│   └── prisma/
│       └── schema.prisma
│
├── frontend/          → Next.js Site (Port: 3001)
│   ├── app/
│   │   ├── page.tsx          → Ana sayfa
│   │   └── villas/page.tsx   → Villa listesi
│   └── components/
│       ├── home/
│       │   ├── VideoHero.tsx       → 🎥 VIDEO HERO
│       │   ├── SearchSection.tsx
│       │   ├── FeaturedVillas.tsx
│       │   └── ...
│       └── layout/
│           ├── Header.tsx
│           └── Footer.tsx
│
├── admin/             → Admin Panel (Port: 3002)
│
└── docker-compose.yml → PostgreSQL + Redis
```

## 🛠️ Sorun Giderme

### Docker çalışmıyor
```powershell
docker-compose down
docker-compose up -d
docker ps  # Kontrol et
```

### Port zaten kullanılıyor
```powershell
# Hangi process kullanıyor bul
netstat -ano | findstr :3000

# Process'i kapat
taskkill /PID [PROCESS_ID] /F
```

### Prisma hatası
```powershell
cd backend
npx prisma generate
npx prisma migrate reset  # Dikkat: Tüm veriyi siler!
```

### Frontend'de API hatası

`frontend/.env.local` dosyasını kontrol et:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## 📊 Prisma Studio (Veritabanı Yönetimi)

Görsel olarak veritabanını görmek için:

```powershell
cd backend
npx prisma studio
```

http://localhost:5555 adresinde açılır. Tabloları görebilir, veri ekleyebilirsiniz.

## 🎨 Özellikler

### ✅ Tamamlanan

**Backend:**
- ✅ NestJS + TypeScript
- ✅ Prisma ORM + PostgreSQL  
- ✅ JWT Authentication
- ✅ Villa CRUD
- ✅ Rezervasyon Sistemi
- ✅ Stripe Ödeme Entegrasyonu
- ✅ Dosya Upload
- ✅ Swagger API Docs

**Frontend:**
- ✅ Next.js 14 + TypeScript
- ✅ **Video Hero Component** 🎥
- ✅ Tailwind CSS
- ✅ Framer Motion (Animasyonlar)
- ✅ Villa Arama
- ✅ Villa Listeleme
- ✅ Responsive Tasarım

### 🚧 Eklenebilir (İhtiyaca göre)

- Villa Detay Sayfası
- Rezervasyon Formu + Takvim
- Kullanıcı Hesap Yönetimi
- Ödeme Checkout Sayfası
- Admin Dashboard
- İletişim Formu
- Blog Sayfası

## 📞 Yardım

Bir sorun olursa:

1. **Terminal loglarını kontrol et** (hatalar orada görünür)
2. **Docker container'ları kontrol et:** `docker ps`
3. **Backend çalışıyor mu:** http://localhost:3000/api/docs
4. **Frontend çalışıyor mu:** http://localhost:3001

## 🎉 Tebrikler!

Projeniz çalışıyor! Emma Villas tarzında profesyonel bir villa kiralama sitesi hazır.

**Şimdi ne yapabilirsiniz:**
- Villa ekleyebilirsiniz (API üzerinden veya Prisma Studio ile)
- Tasarımı özelleştirebilirsiniz
- Yeni özellikler ekleyebilirsiniz
- Production'a deploy edebilirsiniz

**Deploy için:**
- Backend: Railway, Heroku, DigitalOcean
- Frontend: Vercel (en kolay), Netlify
- Database: Railway PostgreSQL, Supabase

---

**Geliştiren:** AI Assistant  
**Tarih:** 11 Kasım 2024  
**İnspire:** Emma Villas (emmavillas.com)

