# ⚡ Hızlı Kopyala-Yapıştır Komutlar

Deployment sırasında kopyalayacağın değerler.

---

## 🔐 RAILWAY ENVIRONMENT VARIABLES

Kopyala ve Railway'e tek tek yapıştır:

### Temel Ayarlar
```
NODE_ENV=production
```

```
PORT=3000
```

### Database (Railway'den aldığın URL'i yapıştır)
```
DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:7654/railway
```

### JWT Secrets
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

### CORS (önce *, sonra Vercel URL'i)
```
CORS_ORIGIN=*
```

### Stripe (placeholder)
```
STRIPE_SECRET_KEY=sk_test_placeholder
```

```
STRIPE_WEBHOOK_SECRET=whsec_placeholder
```

```
STRIPE_PUBLIC_KEY=pk_test_placeholder
```

### AWS (placeholder)
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

### Upload
```
MAX_FILE_SIZE=10485760
```

```
UPLOAD_DESTINATION=./uploads
```

---

## 🎨 VERCEL ENVIRONMENT VARIABLES

### Frontend API URL (Railway backend URL'i + /api/v1)
```
NEXT_PUBLIC_API_URL=https://viilaproje-production-xxxx.up.railway.app/api/v1
```

**NOT:** Backend URL'ini Railway'den al, sonuna `/api/v1` ekle!

---

## 🗄️ RAILWAY SHELL KOMUTLARI

Tek tek kopyala-yapıştır:

### 1. Prisma Client Oluştur
```bash
npx prisma generate
```

### 2. Database Migration
```bash
npx prisma migrate deploy
```

### 3. Test Verilerini Yükle (3 villa + 2 user)
```bash
npm run prisma:seed
```

---

## 🔄 GÜNCELLEME KOMUTLARI

Proje değişikliklerini yüklemek için:

```powershell
cd C:\websiteler\villaproje
git add .
git commit -m "Açıklama mesajı"
git push
```

---

## 📋 CHECKLIST

Deploy sırasında işaretle:

- [ ] Railway PostgreSQL oluşturuldu
- [ ] Database URL kopyalandı
- [ ] Railway backend servisi eklendi
- [ ] Backend root directory: `backend`
- [ ] 17 environment variable eklendi
- [ ] Backend deploy edildi (SUCCESS)
- [ ] Backend URL kopyalandı
- [ ] Vercel'de frontend import edildi
- [ ] Frontend root directory: `frontend`
- [ ] Frontend ENV eklendi
- [ ] Frontend deploy edildi
- [ ] Frontend URL kopyalandı
- [ ] Frontend ENV güncellendi (backend URL)
- [ ] Frontend redeploy edildi
- [ ] Backend CORS güncellendi (frontend URL)
- [ ] Backend redeploy edildi
- [ ] Railway Shell'de 3 komut çalıştırıldı
- [ ] Test: Frontend açıldı
- [ ] Test: Video hero çalışıyor
- [ ] Test: 3 villa görünüyor
- [ ] Test: Backend API çalışıyor

---

## 🎯 URL'LER

### GitHub (hazır)
```
https://github.com/webrektasarim-dev/viilaproje
```

### Railway (giriş)
```
https://railway.app
```

### Vercel (giriş)
```
https://vercel.com
```

### Frontend (deploy sonrası)
```
https://viilaproje.vercel.app
```

### Backend (deploy sonrası)
```
https://viilaproje-production-xxxx.up.railway.app
```

### API Docs (deploy sonrası)
```
https://viilaproje-production-xxxx.up.railway.app/api/docs
```

---

## 🔑 TEST HESAPLARI

Deploy sonrası kullan:

### Admin
```
Email: admin@villaproje.com
Şifre: Admin123!
```

### Normal User
```
Email: test@villaproje.com
Şifre: Test123!
```

---

## 💡 NOTLAR

- Database URL'i Railway PostgreSQL'den alınır
- Backend URL'i Railway backend servisinden alınır
- Frontend URL'i Vercel'den alınır
- CORS_ORIGIN'e frontend URL'i (slash olmadan)
- NEXT_PUBLIC_API_URL'e backend URL + `/api/v1`

---

**Bu dosyayı yan pencerede aç, kopyala-yapıştır yap!**

