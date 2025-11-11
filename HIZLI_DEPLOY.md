# ⚡ Hızlı Deploy - 15 Dakikada Yayına Al!

En hızlı yol - Sadece gerekli adımlar.

## 1️⃣ GitHub'a Yükle (2 dakika)

```powershell
cd C:\websiteler\villaproje

git init
git add .
git commit -m "Villa kiralama sitesi"

# GitHub'da yeni repo oluştur: https://github.com/new
# Sonra:
git remote add origin https://github.com/KULLANICI_ADIN/villaproje.git
git push -u origin main
```

## 2️⃣ Railway'de Database + Backend (5 dakika)

### A) Railway'e Git
https://railway.app → GitHub ile giriş yap

### B) PostgreSQL Oluştur
- "New Project"
- "Provision PostgreSQL"
- Connection URL'i kopyala

### C) Backend Deploy
- "New" → "GitHub Repo" → `villaproje` seç
- **Root Directory:** `backend` yaz
- **Environment Variables** ekle:

```env
NODE_ENV=production
DATABASE_URL=YUKARIDAN_KOPYALADIĞIN_URL
JWT_SECRET=SuperSecretKey123!
CORS_ORIGIN=*
```

- Deploy et
- Backend URL'i not al (örn: `https://villaproje-xxx.up.railway.app`)

### D) Database Migration
Railway → Backend → Shell:
```bash
npx prisma migrate deploy
npx prisma db seed
```

## 3️⃣ Vercel'de Frontend (3 dakika)

### A) Vercel'e Git
https://vercel.com → GitHub ile giriş yap

### B) Frontend Deploy
- "New Project"
- GitHub'dan `villaproje` seç
- **Root Directory:** `frontend` yaz
- **Environment Variables:**

```env
NEXT_PUBLIC_API_URL=RAILWAY_BACKEND_URL/api/v1
```

(Örn: `https://villaproje-xxx.up.railway.app/api/v1`)

- Deploy et

## 4️⃣ CORS Düzelt (1 dakika)

Railway'e geri dön → Backend → Variables:

```env
CORS_ORIGIN=VERCEL_FRONTEND_URL
```

(Örn: `https://villaproje-xxx.vercel.app`)

## ✅ Bitti!

Frontend URL: https://villaproje-xxx.vercel.app
Backend URL: https://villaproje-xxx.up.railway.app

**Test et:**
- Ana sayfa video açılıyor mu?
- Villalar listeleniyor mu?

**Login:**
- Email: test@villaproje.com
- Şifre: Test123!

---

## 🔄 Güncelleme Yapmak

```powershell
git add .
git commit -m "güncelleme"
git push
```

Vercel ve Railway otomatik deploy eder!

---

## 💡 İpucu

- **Ücretsiz** kalır Railway 500 saat/ay limiti yeterse
- **Domain eklemek** için: Vercel → Settings → Domains
- **Sorun mu var?** Railway/Vercel logs'a bak

---

**Hazır! Siteniz internette! 🚀**

