# 🎯 Render Manuel Web Service Setup

Blueprint çalışmadı, manuel yapalım (daha garantili!)

---

## 🚀 ADIM 1: Mevcut Servisi Sil

1. Render dashboard
2. **"villaproje-backend"** servisine tıkla
3. Sağ üstte **"Settings"**
4. En alta kaydır → **"Delete Service"**
5. Confirm

---

## 🚀 ADIM 2: Yeni Web Service Oluştur

### 1. New Web Service

1. Dashboard'da **"New +"**
2. **"Web Service"** seç
3. **"Build and deploy from a Git repository"** → **"Next"**
4. **"viilaproje"** seç → **"Connect"**

### 2. Ayarları Doldur

**Name:**
```
villaproje-backend
```

**Region:**
```
Frankfurt
```

**Branch:**
```
main
```

**Root Directory:** ⚠️ ÖNEMLİ!
```
backend
```
(Edit tıkla, "backend" klasörünü seç)

**Build Command:**
```
npm install && npx prisma generate && npm run build
```

**Start Command:**
```
npm run start:prod
```

**Instance Type:**
```
Free
```

### 3. Environment Variables

**"Add Environment Variable"** ile tek tek ekle (17 tane):

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://neondb_owner:npg_kKZimnp7U3eW@ep-dawn-block-agwtnyk0-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=VillaProje2024SuperSecretProductionKey!
JWT_REFRESH_SECRET=VillaProje2024RefreshSecretProductionKey!
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=*
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder
STRIPE_PUBLIC_KEY=pk_test_placeholder
AWS_ACCESS_KEY_ID=temp
AWS_SECRET_ACCESS_KEY=temp
AWS_S3_BUCKET=villaproje
AWS_REGION=eu-central-1
MAX_FILE_SIZE=10485760
UPLOAD_DESTINATION=./uploads
```

### 4. Deploy

**"Create Web Service"** tıkla!

---

## ⏱️ Deploy Süresi: 5-8 dakika

Bu sefer **kesin** çalışacak!

---

## ✅ SUCCESS Sonrası:

1. **Shell'e git** (üstte sekme)
2. Migration çalıştır:
   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```

3. **Backend URL'ini kopyala:**
   ```
   https://villaproje-backend.onrender.com
   ```

---

**Manuel setup yap, bu sefer %100 çalışır!** 🚀

