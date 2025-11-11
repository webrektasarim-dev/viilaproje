# 🏡 Villa Kiralama Sitesi

Emma Villas tarzında profesyonel villa kiralama platformu.

## 📋 Özellikler

### Kullanıcı Sitesi
- ✅ Video hero bölümü
- ✅ Gelişmiş villa arama sistemi
- ✅ Villa listeleme ve detay sayfaları
- ✅ Rezervasyon sistemi
- ✅ Güvenli ödeme (Stripe/İyzico)
- ✅ Kullanıcı hesap yönetimi
- ✅ Çoklu dil desteği (TR/EN)

### Admin Panel
- ✅ Villa yönetimi (CRUD)
- ✅ Görsel ve video yükleme
- ✅ Rezervasyon yönetimi
- ✅ Ödeme takibi
- ✅ İstatistikler ve raporlama

## 🚀 Teknoloji Stack

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- Bull Queue
- AWS S3

### Frontend (Kullanıcı Sitesi)
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Query

### Admin Panel
- Next.js 14
- Shadcn/ui
- TypeScript
- Tailwind CSS

## 📦 Kurulum

### 1. Gereksinimleri Yükleyin
- Node.js 20.x
- Docker Desktop
- Git

### 2. Projeyi Klonlayın
```bash
git clone [repository-url]
cd villaproje
```

### 3. Docker'ı Başlatın
```bash
docker-compose up -d
```

### 4. Backend Kurulumu
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

Backend: http://localhost:3000
Swagger API Docs: http://localhost:3000/api/docs

### 5. Frontend Kurulumu
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3001

### 6. Admin Panel Kurulumu
```bash
cd admin
npm install
npm run dev
```

Admin Panel: http://localhost:3002

## 🔐 Test Hesapları

### Admin
- Email: admin@villaproje.com
- Şifre: Admin123!

### Kullanıcı
- Email: test@villaproje.com
- Şifre: Test123!

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/villaproje
REDIS_URL=redis://localhost:6379
JWT_SECRET=VillaProjeSecretKey2024!
JWT_REFRESH_SECRET=VillaProjeRefreshSecretKey2024!
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=villaproje-dev
AWS_REGION=eu-central-1
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

## 📂 Proje Yapısı

```
villaproje/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── villas/
│   │   │   ├── reservations/
│   │   │   ├── payments/
│   │   │   └── upload/
│   │   └── prisma/
│   └── package.json
│
├── frontend/            # Next.js Kullanıcı Sitesi
│   ├── app/
│   ├── components/
│   └── package.json
│
├── admin/               # Next.js Admin Panel
│   ├── app/
│   ├── components/
│   └── package.json
│
└── docker-compose.yml
```

## 🛠️ Geliştirme

### Backend
```bash
cd backend
npm run start:dev        # Development mode
npm run build           # Production build
npm run test            # Run tests
```

### Frontend
```bash
cd frontend
npm run dev             # Development mode
npm run build          # Production build
npm run lint           # Lint check
```

### Admin
```bash
cd admin
npm run dev             # Development mode
npm run build          # Production build
```

## 📄 API Dokümantasyonu

Swagger UI: http://localhost:3000/api/docs

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

MIT License

## 📧 İletişim

Proje sahibi - info@villaproje.com

