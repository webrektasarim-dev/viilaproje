# 🚀 Vercel + Git Deployment Rehberi

Docker'sız, bulutta çalışan villa kiralama sitesi kurulumu.

## 📋 Genel Bakış

### Kullanacağımız Servisler:
1. **Frontend** → Vercel (Ücretsiz)
2. **Backend** → Railway veya Render (Ücretsiz başlangıç)
3. **Database** → Railway PostgreSQL veya Supabase (Ücretsiz)
4. **Redis** → Upstash (Ücretsiz)
5. **Storage** → Cloudinary veya Vercel Blob (Ücretsiz)

---

## 🎯 Adım 1: Git Repository Oluştur

### GitHub'da Repo Oluştur

1. https://github.com/new adresine git
2. Repository adı: `villaproje`
3. Private veya Public seç
4. "Create repository" tıkla

### Projeyi Git'e Yükle

```powershell
cd C:\websiteler\villaproje

# Git başlat
git init

# Dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: Villa kiralama sitesi - Emma Villas style"

# GitHub'a bağla (REPONUZUN URL'İNİ YAZIN)
git remote add origin https://github.com/KULLANICI_ADIN/villaproje.git

# Push et
git branch -M main
git push -u origin main
```

---

## 🗄️ Adım 2: Database Hazırla (Railway)

### Railway'e Kayıt Ol
1. https://railway.app adresine git
2. GitHub ile giriş yap
3. "New Project" tıkla
4. "Provision PostgreSQL" seç

### Database Bilgilerini Al

Railway dashboard'da:
- Database → Connect → Connection String'i kopyala

```
postgresql://postgres:XXXXXXX@containers-us-west-xxx.railway.app:7654/railway
```

Bu URL'i not al, lazım olacak.

---

## 🚀 Adım 3: Backend Deploy Et (Railway)

### Railway'de Backend Oluştur

1. Railway dashboard'da "New" → "GitHub Repo"
2. `villaproje` repository'ni seç
3. "Add variables" tıkla

### Environment Variables Ekle

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://postgres:XXXXXXX@containers-us-west-xxx.railway.app:7654/railway
REDIS_URL=redis://default:XXXXXXX@xxxx.upstash.io:6379

JWT_SECRET=VillaProjeProductionSecret2024!ChangeThisInProduction
JWT_REFRESH_SECRET=VillaProjeRefreshProductionSecret2024!ChangeThis
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_live_XXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXX

AWS_ACCESS_KEY_ID=AKIAXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXX
AWS_S3_BUCKET=villaproje-prod
AWS_REGION=eu-central-1

CORS_ORIGIN=https://villaproje.vercel.app
```

### Build Settings

Railway otomatik algılar ama emin olmak için:

**Root Directory:** `backend`
**Build Command:** `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
**Start Command:** `npm run start:prod`

### Deploy Et

"Deploy" butonuna tıkla. 5-10 dakika sürer.

Backend URL'iniz şöyle olacak:
```
https://villaproje-backend-production.up.railway.app
```

### Database Migration Çalıştır

Railway dashboard → backend servisi → Shell:

```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## 🎨 Adım 4: Frontend Deploy Et (Vercel)

### Vercel'e Kayıt Ol

1. https://vercel.com adresine git
2. "Sign Up" → GitHub ile giriş yap

### Frontend Deploy

1. Vercel dashboard'da "New Project"
2. GitHub'dan `villaproje` repo'sunu import et
3. **Framework Preset:** Next.js (otomatik algılar)
4. **Root Directory:** `frontend`
5. **Build Command:** `npm run build`
6. **Output Directory:** `.next` (otomatik)

### Environment Variables Ekle

```env
NEXT_PUBLIC_API_URL=https://villaproje-backend-production.up.railway.app/api/v1
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_XXXXXXX
```

7. "Deploy" tıkla

Frontend URL'iniz şöyle olacak:
```
https://villaproje.vercel.app
```

---

## 🔧 Adım 5: Backend CORS Ayarla

Backend'de CORS origin'i güncelle:

Railway dashboard → Backend → Variables:

```env
CORS_ORIGIN=https://villaproje.vercel.app
```

Redeploy yapılacak (otomatik).

---

## 📦 Alternatif: Render.com (Railway yerine)

Railway limitini aşarsanız Render kullanabilirsiniz.

### Render'da Backend Deploy

1. https://render.com → "New" → "Web Service"
2. GitHub repo'nuzu bağlayın
3. Ayarlar:
   - **Name:** villaproje-backend
   - **Root Directory:** backend
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Instance Type:** Free

4. Environment variables ekleyin (yukarıdaki gibi)

---

## ☁️ Alternatif: Supabase Database

Railway yerine Supabase kullanabilirsiniz (daha fazla ücretsiz quota).

### Supabase Setup

1. https://supabase.com → "New Project"
2. Database password belirle
3. Connection string al:

```
postgresql://postgres:PASSWORD@db.XXXXX.supabase.co:5432/postgres
```

4. Bu URL'i `DATABASE_URL` olarak kullan

---

## 🎉 Adım 6: Test Et!

### Frontend Test
https://villaproje.vercel.app

- ✅ Video Hero açılıyor mu?
- ✅ Villalar listeleniyor mu?
- ✅ API bağlantısı çalışıyor mu?

### Backend Test
https://villaproje-backend-production.up.railway.app/api/docs

- ✅ Swagger açılıyor mu?
- ✅ GET /villas çalışıyor mu?

### Login Test
1. Frontend'de Login'e git
2. Test hesabı ile giriş yap:
   - Email: test@villaproje.com
   - Şifre: Test123!

---

## 🔄 Güncelleme Yapmak

Artık çok kolay! Sadece git push:

```powershell
cd C:\websiteler\villaproje

# Değişiklik yap
# Dosyaları düzenle...

# Git'e push et
git add .
git commit -m "Yeni özellik eklendi"
git push

# Vercel ve Railway otomatik deploy eder!
```

---

## 💰 Maliyet

### Ücretsiz Tier (Başlangıç için yeterli)

- **Vercel:** 100GB bant genişliği/ay (ücretsiz)
- **Railway:** 500 saat/ay (ücretsiz)
- **Supabase:** 500MB database (ücretsiz)
- **Upstash Redis:** 10,000 komut/gün (ücretsiz)

### Ücretli Geçiş (Trafiğiniz arttığında)

- **Vercel Pro:** $20/ay
- **Railway Hobby:** $5/ay
- **Supabase Pro:** $25/ay

---

## 🛠️ Sorun Giderme

### Build hatası

Vercel/Railway loglarını kontrol et:
```
Dashboard → Deployments → Son deployment → Logs
```

### API bağlanamıyor

Frontend'de `.env` kontrolü:
```
NEXT_PUBLIC_API_URL=https://BACKEND_URL/api/v1
```

Backend'de CORS kontrolü:
```
CORS_ORIGIN=https://FRONTEND_URL
```

### Database bağlanamıyor

Railway/Supabase'de connection string'i kontrol et:
```
DATABASE_URL=postgresql://...
```

Migration çalıştır:
```bash
npx prisma migrate deploy
```

---

## 🎯 Domain Bağlama (Opsiyonel)

### Kendi Domain'iniz Varsa

**Frontend (Vercel):**
1. Vercel dashboard → Settings → Domains
2. `www.villaprojen.com` ekle
3. DNS ayarlarını yap (Vercel gösterir)

**Backend (Railway):**
1. Railway dashboard → Settings → Public Networking
2. Custom domain ekle
3. DNS ayarları yap

---

## 🚀 Production Checklist

Deploy etmeden önce kontrol et:

- [ ] `.env` dosyaları `.gitignore`'da
- [ ] JWT secrets değiştirildi
- [ ] Stripe production keys eklendi
- [ ] CORS düzgün ayarlandı
- [ ] Database production'da
- [ ] Test verisi seed edildi
- [ ] SSL sertifikaları aktif (Vercel/Railway otomatik)

---

## 📞 Yardım

Sorun yaşarsanız:

1. Vercel/Railway logs kontrol et
2. GitHub Issues aç
3. Discord/Slack community'ye sor

---

## 🎊 Tebrikler!

Siteniz artık internette yayında! 🌍

**Paylaş:**
- https://villaproje.vercel.app

**API Docs:**
- https://backend-url/api/docs

**Sonraki Adımlar:**
1. Custom domain al
2. Analytics ekle (Google Analytics, Vercel Analytics)
3. SEO optimize et
4. Performance monitoring (Sentry)
5. Sosyal medyada paylaş

---

**Not:** Bu rehber Docker kullanmadan, tamamen bulut servislerde çalışan bir deployment sağlar. Yerel geliştirme için Docker hala kullanabilirsiniz ama production'da gerekmez.

