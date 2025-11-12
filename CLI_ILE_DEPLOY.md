# 🚀 CLI ile Otomatik Deploy - Beraber Yapalım!

Web arayüzüne girmeden, terminal'den deploy!

---

## 🎯 Adım 1: Railway CLI Kur (Ben yapacağım)

```powershell
npm install -g @railway/cli
```

---

## 🎯 Adım 2: Railway Login (Sen yapacaksın - 1 kez)

```powershell
railway login
```

→ Tarayıcı açılacak
→ GitHub ile giriş yap
→ "Authorize Railway" tıkla
→ Terminal'e geri dön

**Sadece 1 kez yapılacak!**

---

## 🎯 Adım 3: Backend Deploy (Ben yapacağım)

```powershell
cd C:\websiteler\villaproje\backend

# Yeni Railway projesi
railway init

# PostgreSQL ekle
railway add --database postgres

# Environment variables ekle
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set JWT_SECRET=VillaProje2024SuperSecretProductionKey!
railway variables set JWT_REFRESH_SECRET=VillaProje2024RefreshSecretProductionKey!
railway variables set CORS_ORIGIN=*

# Deploy et
railway up
```

---

## 🎯 Adım 4: Vercel CLI Kur (Ben yapacağım)

```powershell
npm install -g vercel
```

---

## 🎯 Adım 5: Vercel Login (Sen yapacaksın - 1 kez)

```powershell
vercel login
```

→ Email gir
→ Verify linke tıkla
→ Terminal'e geri dön

**Sadece 1 kez yapılacak!**

---

## 🎯 Adım 6: Frontend Deploy (Ben yapacağım)

```powershell
cd C:\websiteler\villaproje\frontend

# Deploy et
vercel --prod
```

---

## ✅ Sonuç

- Backend: Railway'de otomatik deploy
- Frontend: Vercel'de otomatik deploy
- Environment variables: Otomatik ayarlanmış
- URLs: Otomatik alınmış

---

## 📊 Karşılaştırma

### Web Arayüzü (Rehberdeki yöntem):
- ⏱️ 20 dakika
- 🖱️ Çok tıklama
- 📋 Manuel kopyala-yapıştır
- 🎯 Her adımı takip etmek gerekir

### CLI (Bu yöntem):
- ⏱️ 5 dakika
- ⌨️ Sadece 2 login komutu (sen)
- 🤖 Geri kalan her şey otomatik (ben)
- 🚀 Çok daha hızlı!

---

## 💡 Hangisi Daha İyi?

**CLI yöntemi** daha hızlı ve kolay!

Ama **ilk kez** Railway ve Vercel kullanıyorsan, **web arayüzü** daha görsel ve anlaşılır olabilir.

Sen karar ver!

