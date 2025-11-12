# ⚡ Render - Hızlı Komutlar

Render.com deployment için kopyala-yapıştır.

---

## 🔗 URL

```
https://render.com
```

---

## 📋 BACKEND BUILD AYARLARI

### Build Command:
```bash
npm install && npx prisma generate && npm run build
```

### Start Command:
```bash
npm run start:prod
```

---

## 🔐 ENVIRONMENT VARIABLES

Render backend servisine ekle:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=[Render PostgreSQL URL buraya]
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

---

## 💻 SHELL KOMUTLARI

Deploy bitince Shell'de çalıştır:

```bash
npx prisma migrate deploy
```

```bash
npm run prisma:seed
```

---

## 🎨 VERCEL ENV

```
NEXT_PUBLIC_API_URL=https://villaproje-backend.onrender.com/api/v1
```

---

## ✅ CHECKLIST

- [ ] Render'a kayıt ol
- [ ] PostgreSQL database oluştur
- [ ] Database URL kopyala
- [ ] Backend web service oluştur
- [ ] Root directory: `backend`
- [ ] Build/Start commands gir
- [ ] ENV variables ekle
- [ ] Create Web Service
- [ ] Deploy bekle (5-10 dk)
- [ ] Shell'de migration çalıştır
- [ ] Shell'de seed çalıştır
- [ ] Backend URL kopyala
- [ ] Vercel'de frontend import et
- [ ] Frontend ENV ekle
- [ ] Frontend deploy et
- [ ] Backend CORS güncelle
- [ ] Test et!

---

## 🎯 SONUÇ

- **Backend:** https://villaproje-backend.onrender.com
- **Frontend:** https://viilaproje.vercel.app
- **API Docs:** https://villaproje-backend.onrender.com/api/docs

---

## 💡 NOTLAR

- Render ücretsiz
- Kredi kartı gerekmez
- 15 dk sonra uyur (ilk istek 30 sn)
- Vercel aynı kalıyor
- Railway yerine Render kullan

