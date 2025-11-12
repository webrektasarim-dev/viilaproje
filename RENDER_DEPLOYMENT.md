# 🚀 Render.com ile Ücretsiz Deploy

Railway yerine Render - Tamamen ücretsiz!

---

## 🎯 ADIM 1: Render'a Kayıt (1 dakika)

1. https://render.com adresine git
2. **"Get Started"** tıkla
3. **"Sign in with GitHub"** seç
4. GitHub ile giriş yap
5. Authorize Render

✅ Dashboard açılacak

---

## 🎯 ADIM 2: PostgreSQL Database Oluştur (2 dakika)

1. Dashboard'da **"New +"** butonu (üstte)
2. **"PostgreSQL"** seç
3. Ayarlar:
   - **Name:** `villaproje-db`
   - **Database:** `villaproje`
   - **User:** `villaproje`
   - **Region:** Frankfurt (veya en yakın)
   - **Plan:** **Free** seç ✅

4. **"Create Database"** tıkla

5. **Bekle** (1-2 dakika)

6. Database oluşunca:
   - **"Info"** sekmesine git
   - **"External Database URL"** kopyala
   ```
   postgresql://villaproje:xxxxx@dpg-xxxxx.frankfurt-postgres.render.com/villaproje
   ```

7. **Notepad'e kaydet!**

✅ Database hazır!

---

## 🎯 ADIM 3: Backend Web Service Oluştur (3 dakika)

1. Dashboard'da **"New +"** → **"Web Service"**

2. **"Build and deploy from a Git repository"** → **"Next"**

3. GitHub'dan **"viilaproje"** seç → **"Connect"**

4. Ayarlar ekranı:

### Basic Ayarlar:
- **Name:** `villaproje-backend`
- **Region:** Frankfurt
- **Branch:** `main`
- **Root Directory:** `backend`

### Build Ayarları:
- **Runtime:** Node
- **Build Command:**
  ```bash
  npm install && npx prisma generate && npm run build
  ```
- **Start Command:**
  ```bash
  npm run start:prod
  ```

### Plan:
- **Instance Type:** **Free** seç ✅

5. **"Advanced"** açılır menüsünü aç

6. **Environment Variables** ekle:

**"Add Environment Variable"** ile tek tek ekle:

```
NODE_ENV=production
```

```
PORT=3000
```

```
DATABASE_URL=YUKARIDA_KOPYALADIĞIN_POSTGRESQL_URL
```

```
JWT_SECRET=VillaProje2024SuperSecretProductionKey!
```

```
JWT_REFRESH_SECRET=VillaProje2024RefreshSecretProductionKey!
```

```
JWT_EXPIRES_IN=15m
```

```
JWT_REFRESH_EXPIRES_IN=7d
```

```
CORS_ORIGIN=*
```

```
STRIPE_SECRET_KEY=sk_test_placeholder
```

```
STRIPE_WEBHOOK_SECRET=whsec_placeholder
```

```
STRIPE_PUBLIC_KEY=pk_test_placeholder
```

```
AWS_ACCESS_KEY_ID=temp
```

```
AWS_SECRET_ACCESS_KEY=temp
```

```
AWS_S3_BUCKET=villaproje
```

```
AWS_REGION=eu-central-1
```

```
MAX_FILE_SIZE=10485760
```

```
UPLOAD_DESTINATION=./uploads
```

7. **"Create Web Service"** tıkla

8. **Deploy başlayacak** (5-10 dakika)

✅ Backend deploying...

---

## 🎯 ADIM 4: Database Migration (Deploy bitince - 2 dakika)

Deploy **SUCCESS** olduktan sonra:

1. Backend servisinde **"Shell"** sekmesine git (üstte)

2. Komutları çalıştır:

```bash
npx prisma migrate deploy
```

```bash
npm run prisma:seed
```

✅ Database hazır, 3 villa + 2 user eklendi!

---

## 🎯 ADIM 5: Backend URL'ini Al

1. Backend servisinde üstte URL göreceksin:
   ```
   https://villaproje-backend.onrender.com
   ```

2. **Kopyala!** (Vercel'de lazım olacak)

✅ Backend çalışıyor!

---

## 🎯 ADIM 6: Vercel'de Frontend (Aynı - 5 dakika)

1. https://vercel.com → GitHub ile giriş

2. **"Add New..."** → **"Project"**

3. **"viilaproje"** → **"Import"**

4. Ayarlar:
   - **Root Directory:** `frontend`
   - **Framework:** Next.js

5. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://villaproje-backend.onrender.com/api/v1
   ```
   (Render backend URL + `/api/v1`)

6. **"Deploy"** tıkla

7. **Bekle** (2-3 dakika)

✅ Frontend hazır!

---

## 🎯 ADIM 7: CORS Güncelle (1 dakika)

Render'da backend servisine dön:

1. **"Environment"** sekmesi
2. `CORS_ORIGIN` değişkenini bul
3. **"Edit"** tıkla
4. Value değiştir:
   ```
   https://viilaproje.vercel.app
   ```
   (Vercel URL'in)

5. **"Save Changes"**

6. **Otomatik redeploy** (2-3 dakika)

✅ Tamamdır!

---

## ✅ TEST ET!

### Frontend:
```
https://viilaproje.vercel.app
```

### Backend API:
```
https://villaproje-backend.onrender.com/api/docs
```

### Test Hesapları:
- admin@villaproje.com / Admin123!
- test@villaproje.com / Test123!

---

## 💰 Ücretsiz mi?

**EVET!** Tamamen ücretsiz:

- ✅ Render Free: 750 saat/ay
- ✅ PostgreSQL: 1GB (ücretsiz)
- ✅ Vercel: 100GB/ay (ücretsiz)

**Kredi kartı gerekmez!**

---

## ⚠️ Önemli Not

Render Free tier'da backend **15 dakika kullanılmazsa uyur**.

İlk istek gelince **30 saniye** içinde uyanır.

Bu normaldir, ücretsiz planda böyle çalışır.

---

## 🔄 Güncelleme Yapmak

Aynı:

```powershell
git add .
git commit -m "güncelleme"
git push
```

Render ve Vercel otomatik deploy eder!

---

## 🆚 Railway vs Render

| Özellik | Railway (Eski) | Render |
|---------|---------------|--------|
| Ücretsiz Backend | ❌ Artık yok | ✅ Var |
| Kredi Kartı | ✅ Gerekiyor | ❌ Gerekmiyor |
| Deploy Hızı | Hızlı | Hızlı |
| Database | ✅ | ✅ |
| Sleep Time | Yok | 15 dk sonra |

---

**Render daha iyi! Tamamen ücretsiz, kredi kartı yok!** 🎉

