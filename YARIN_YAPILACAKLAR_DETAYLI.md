# 🚀 Yarın Yapılacaklar - Detaylı Adım Adım Rehber

**Süre:** 15-20 dakika
**Gerekli:** GitHub hesabı (zaten var)

---

## 📋 ADIM 1: RAILWAY'DE DATABASE + BACKEND (8 dakika)

### 1.1 Railway'e Giriş Yap (1 dakika)

1. **Tarayıcıda aç:** https://railway.app
2. Sağ üstte **"Login"** butonu
3. **"Login with GitHub"** tıkla
4. GitHub şifrenizi girin (otomatik yönlendirir)
5. Railway izinleri isteyecek → **"Authorize Railway"** tıkla

✅ **Başardın!** Railway dashboard'ı göreceksin (boş sayfa, "New Project" butonu var)

---

### 1.2 PostgreSQL Database Oluştur (2 dakika)

1. **"New Project"** butonuna tıkla (mor renk, ortada büyük buton)
2. Açılan menüde **"Provision PostgreSQL"** seç
   - Postgres logosu görünecek
3. **Bekle** → 30 saniye içinde database oluşacak
4. Ekranda PostgreSQL kartı görünecek (mor kutu)

#### Database URL'ini Kopyala:

5. PostgreSQL kartına **tıkla** (mor kutu)
6. Sağda panel açılacak
7. **"Connect"** sekmesine tıkla (üstte)
8. **"Postgres Connection URL"** başlığını bul
9. Yanındaki **kopyala** ikonuna tıkla 📋

```
Örnek URL:
postgresql://postgres:gSk9mN-xyz123@containers-us-west-123.railway.app:7654/railway
```

10. **Bu URL'i bir yere yapıştır** (Notepad'e kaydet, lazım olacak!)

✅ **Başardın!** Database hazır, URL'i kaydettik

---

### 1.3 Backend Servisi Ekle (2 dakika)

#### Project'e Geri Dön:

1. Sol üstte **project adına** tıkla veya **"Back"** ok tuşu
2. Ana dashboard'a döneceksin (PostgreSQL kartı görünüyor)

#### Backend Ekle:

3. **"New"** butonu (sağ üstte, + işareti ile) → Tıkla
4. Menüden **"GitHub Repo"** seç
5. Repo listesi açılacak
6. **"viilaproje"** repository'ni bul ve **"Add"** tıkla

Eğer repo görünmüyorsa:
- "Configure GitHub App" tıkla
- Repository access → "All repositories" seç veya "viilaproje"yi seç
- Save → Railway'e geri dön

7. **Bekle** → Service oluşacak (30 saniye)
8. Ekranda 2 kart göreceksin:
   - **PostgreSQL** (mor)
   - **viilaproje** (mavi/yeşil)

✅ **Başardın!** Backend servisi eklendi

---

### 1.4 Backend Ayarlarını Yap (3 dakika)

#### Root Directory Ayarla:

1. **viilaproje** kartına tıkla
2. Sağda panel açılacak
3. Üstte **"Settings"** sekmesine tıkla
4. Aşağı kaydır → **"Root Directory"** bul
5. Kutucuğa `backend` yaz (küçük harfle)
6. Enter → Kayıt olacak

#### Environment Variables Ekle:

7. Üstte **"Variables"** sekmesine tıkla
8. **"Add Variable"** butonu (veya "New Variable")

Şimdi **tek tek** her değişkeni ekle:

**Değişken 1:**
- **Variable:** `NODE_ENV`
- **Value:** `production`
- Add tıkla

**Değişken 2:**
- **Variable:** `PORT`
- **Value:** `3000`
- Add tıkla

**Değişken 3:** (ÖNEMLİ!)
- **Variable:** `DATABASE_URL`
- **Value:** `NOTEPAD'E KAYDETTIĞIN PostgreSQL URL'İNİ YAPISTIR`
- Add tıkla

**Değişken 4:**
- **Variable:** `JWT_SECRET`
- **Value:** `VillaProje2024SuperSecretProductionKey!`
- Add tıkla

**Değişken 5:**
- **Variable:** `JWT_REFRESH_SECRET`
- **Value:** `VillaProje2024RefreshSecretProductionKey!`
- Add tıkla

**Değişken 6:**
- **Variable:** `JWT_EXPIRES_IN`
- **Value:** `15m`
- Add tıkla

**Değişken 7:**
- **Variable:** `JWT_REFRESH_EXPIRES_IN`
- **Value:** `7d`
- Add tıkla

**Değişken 8:**
- **Variable:** `CORS_ORIGIN`
- **Value:** `*` (şimdilik, sonra değişecek)
- Add tıkla

**Değişken 9-11:** (Stripe - şimdilik test values)
- **Variable:** `STRIPE_SECRET_KEY`
- **Value:** `sk_test_placeholder`
- Add tıkla

- **Variable:** `STRIPE_WEBHOOK_SECRET`
- **Value:** `whsec_placeholder`
- Add tıkla

- **Variable:** `STRIPE_PUBLIC_KEY`
- **Value:** `pk_test_placeholder`
- Add tıkla

**Değişken 12-15:** (AWS - placeholder)
- **Variable:** `AWS_ACCESS_KEY_ID`
- **Value:** `temp`

- **Variable:** `AWS_SECRET_ACCESS_KEY`
- **Value:** `temp`

- **Variable:** `AWS_S3_BUCKET`
- **Value:** `villaproje`

- **Variable:** `AWS_REGION`
- **Value:** `eu-central-1`

**Değişken 16-17:** (Upload)
- **Variable:** `MAX_FILE_SIZE`
- **Value:** `10485760`

- **Variable:** `UPLOAD_DESTINATION`
- **Value:** `./uploads`

✅ **17 değişken eklendi!** 

#### Deploy Başlasın:

9. Değişkenler kaydedildi → Otomatik deploy başlayacak
10. **"Deployments"** sekmesine tıkla (üstte)
11. En üstteki deployment'ı göreceksin (Building... yazıyor)
12. **5-10 dakika bekle** ☕

Deploy sürerken sonraki adımlara geçebilirsin!

---

## 📋 ADIM 2: VERCEL'DE FRONTEND (5 dakika)

### 2.1 Vercel'e Giriş Yap (1 dakika)

1. **YENİ SEKME AÇ:** https://vercel.com
2. Sağ üstte **"Sign Up"** (veya "Login" yazıyorsa onu)
3. **"Continue with GitHub"** tıkla
4. GitHub şifrenizi girin
5. Vercel izinleri isteyecek → **"Authorize Vercel"** tıkla

✅ **Başardın!** Vercel dashboard'ı göreceksin

---

### 2.2 Projeyi Import Et (2 dakika)

1. **"Add New..."** butonu (sağ üstte) → Tıkla
2. Dropdown menüden **"Project"** seç
3. **"Import Git Repository"** bölümünde:
4. GitHub hesabınız seçili olacak
5. Repository listesinde **"viilaproje"** bul
6. Yanında **"Import"** butonu → Tıkla

✅ **Başardın!** Configure Project sayfası açılacak

---

### 2.3 Projeyi Yapılandır (2 dakika)

#### Framework Ayarları:

**"Configure Project"** sayfasında:

1. **Framework Preset:** `Next.js` (otomatik algılanmış olacak)
2. **Root Directory:** 
   - **"Edit"** butonu (sağda) → Tıkla
   - Klasör listesi açılacak
   - **"frontend"** klasörünü seç
   - **"Continue"** tıkla

3. **Build and Output Settings:** (otomatik, dokunma)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

#### Environment Variables Ekle:

4. Aşağı kaydır → **"Environment Variables"** bölümü

5. İlk kutucuğa (Key): `NEXT_PUBLIC_API_URL`

6. İkinci kutucuğa (Value): **ŞİMDİLİK BOŞ BIRAK** 
   (Railway backend URL'i henüz yok, sonra ekleyeceğiz)
   
   Geçici olarak yaz: `http://localhost:3000/api/v1`

7. **"Add"** butonu

#### Deploy Et:

8. En altta büyük mavi **"Deploy"** butonu → Tıkla

9. Deploy başlayacak (2-3 dakika)

10. **Bekle** → Confetti animasyonu göreceksin! 🎉

✅ **Başardın!** Frontend deploy edildi

---

### 2.4 Frontend URL'ini Kopyala

Deploy bitince:

1. **"Visit"** butonu göreceksin → Henüz TIKLAMA
2. Sayfada URL göreceksin:
   ```
   https://viilaproje.vercel.app
   ```
   veya
   ```
   https://viilaproje-webrektasarim-dev.vercel.app
   ```

3. **Bu URL'i kopyala** (Notepad'e kaydet)

✅ **Frontend URL'i kaydettik!**

---

## 📋 ADIM 3: BACKEND URL'İNİ AL VE FRONTEND'E EKLE (3 dakika)

### 3.1 Railway'e Dön, Backend URL'ini Al

1. Railway sekmesine geri dön
2. **"Deployments"** sekmesinde:
   - En üstteki deployment **"SUCCESS"** (yeşil) olmalı
   - Hala **"BUILDING"** ise biraz daha bekle

3. **"Settings"** sekmesine tıkla
4. Aşağı kaydır → **"Networking"** bölümü
5. **"Public Networking"** altında URL göreceksin:
   ```
   https://viilaproje-production-xxxx.up.railway.app
   ```

6. **URL'i kopyala** (Notepad'e kaydet)

✅ **Backend URL'i aldık!**

---

### 3.2 Vercel'e Geri Dön, Frontend ENV'yi Güncelle

1. Vercel sekmesine geri dön
2. Sol menüden **"Settings"** → Tıkla
3. Sol menüden **"Environment Variables"** → Tıkla
4. `NEXT_PUBLIC_API_URL` değişkenini bul
5. Sağda **"Edit"** (kalem ikonu) → Tıkla
6. Value'yu değiştir:
   ```
   https://BACKEND_URL/api/v1
   ```
   
   **Örnek:**
   ```
   https://viilaproje-production-xxxx.up.railway.app/api/v1
   ```
   
   **DİKKAT:** Sonuna `/api/v1` eklemeyi unutma!

7. **"Save"** tıkla

#### Redeploy Tetikle:

8. Üstten **"Deployments"** sekmesine git
9. En üstteki deployment'ın sağında **"..." (3 nokta)** → Tıkla
10. **"Redeploy"** seç
11. Confirm ekranında **"Redeploy"** tıkla

12. **2-3 dakika bekle** (yeni deploy)

✅ **Frontend artık backend'i tanıyor!**

---

## 📋 ADIM 4: BACKEND CORS AYARLA (2 dakika)

### 4.1 Railway'de CORS Değişkenini Güncelle

1. Railway'e geri dön
2. **viilaproje** servisine tıkla
3. **"Variables"** sekmesi
4. `CORS_ORIGIN` değişkenini bul
5. Sağda **"Edit"** (kalem ikonu) → Tıkla
6. Value'yu değiştir:
   ```
   https://viilaproje.vercel.app
   ```
   (Vercel'den kopyaladığın URL, `/api/v1` OLMADAN)

7. **Enter** veya **"Update"** tıkla

8. **Otomatik redeploy** başlayacak (2-3 dakika)

9. **Bekle** → "Deployments" sekmesinde SUCCESS görene kadar

✅ **CORS ayarlandı!** Backend artık frontend'i kabul eder

---

## 📋 ADIM 5: DATABASE MIGRATION + SEED (3 dakika)

### 5.1 Railway Shell'e Git

Railway'de backend servisi seçili iken:

1. Üstte **"Shell"** sekmesi (veya sağ üstte 3 nokta → "Shell")
2. Komut satırı açılacak (terminal görünümü)

### 5.2 Prisma Komutlarını Çalıştır

**Tek tek kopyala-yapıştır ve Enter:**

#### Komut 1: Prisma Client Oluştur
```bash
npx prisma generate
```
Enter → 10-20 saniye bekle
✅ "Generated Prisma Client" mesajı gelecek

#### Komut 2: Database Migration
```bash
npx prisma migrate deploy
```
Enter → 30 saniye bekle
✅ "All migrations have been successfully applied" mesajı

#### Komut 3: Test Verilerini Yükle
```bash
npm run prisma:seed
```
Enter → 20-30 saniye bekle
✅ Şunları göreceksin:
```
✅ Admin user created: admin@villaproje.com
✅ Test user created: test@villaproje.com
✅ Amenities created
✅ Features created
✅ Villa created: Villa Deniz Manzaralı Lüks
✅ Villa created: Villa Panorama Bodrum
✅ Villa created: Villa Zeytinlik Fethiye
🎉 Seeding completed successfully!
```

✅ **Başardın!** Database hazır, 3 villa ve 2 kullanıcı eklendi!

---

## 📋 ADIM 6: TEST ET! (3 dakika)

### 6.1 Frontend'i Aç

1. Yeni sekmede Vercel frontend URL'ini aç:
   ```
   https://viilaproje.vercel.app
   ```

2. **Görmen gerekenler:**
   - ✅ **Video Hero** - Otomatik oynatılan lüks villa videosu
   - ✅ **Arama Formu** - Lokasyon, tarih, misafir seçenekleri
   - ✅ **Öne Çıkan Villalar** - 3 villa kartı
   - ✅ **Özellikler** - WiFi, Güvenli Ödeme vs.
   - ✅ **Yorumlar** - Müşteri testimonials
   - ✅ **Footer**

### 6.2 Villa Listesini Kontrol Et

1. Header'da **"Villalar"** menüsüne tıkla
   veya
   URL'e git: `https://viilaproje.vercel.app/villas`

2. **Görmen gerekenler:**
   - ✅ 3 villa kartı:
     - Villa Deniz Manzaralı Lüks (Antalya)
     - Villa Panorama Bodrum (Bodrum)
     - Villa Zeytinlik Fethiye (Fethiye)

### 6.3 Backend API'yi Test Et

1. Yeni sekmede backend URL'ini aç:
   ```
   https://viilaproje-production-xxxx.up.railway.app/api/docs
   ```

2. **Swagger UI** açılacak

3. Test et:
   - **GET /api/v1/villas** → Try it out → Execute
   - Response'da 3 villa görmeli

### 6.4 Login Test Et (Opsiyonel)

Frontend'de:

1. Header'da **"Hesabım"** butonu → Tıkla
2. Login sayfası açılacak
3. Test hesabı ile giriş yap:
   - **Email:** test@villaproje.com
   - **Şifre:** Test123!
4. **Giriş Yap** → Başarılı!

---

## ✅ TAMAMLANDILAR LİSTESİ

Deploy sonrası checklist:

- [ ] Railway'de database oluşturuldu
- [ ] Railway'de backend deploy edildi
- [ ] Backend environment variables eklendi
- [ ] Vercel'de frontend deploy edildi
- [ ] Frontend environment variable eklendi
- [ ] Backend CORS ayarlandı
- [ ] Database migration çalıştırıldı
- [ ] Seed data yüklendi (3 villa + 2 user)
- [ ] Frontend açıldı ve video hero çalışıyor
- [ ] Villa listesi görünüyor
- [ ] Backend API çalışıyor (Swagger)
- [ ] Login çalışıyor

---

## 🎉 BAŞARILI! SİTENİZ YAYINDA!

### Siteniz:
- **Frontend:** https://viilaproje.vercel.app
- **Backend API:** https://viilaproje-production-xxxx.up.railway.app
- **API Docs:** https://viilaproje-production-xxxx.up.railway.app/api/docs

### Test Hesapları:
- **Admin:** admin@villaproje.com / Admin123!
- **User:** test@villaproje.com / Test123!

### Örnek Villalar:
- Villa Deniz Manzaralı Lüks (Antalya/Kaş)
- Villa Panorama Bodrum (Bodrum/Yalıkavak)
- Villa Zeytinlik Fethiye (Fethiye/Ölüdeniz)

---

## 🔄 Güncelleme Yapmak

Artık çok basit:

```powershell
cd C:\websiteler\villaproje

# Değişiklik yap...

git add .
git commit -m "Yeni özellik"
git push
```

**Vercel ve Railway otomatik deploy eder!** 🚀

---

## 🆘 Sorun mu var?

### Frontend boş görünüyor:
1. Vercel → Settings → Environment Variables
2. `NEXT_PUBLIC_API_URL` doğru mu kontrol et
3. Redeploy yap

### Villa listesi boş:
1. Railway → Shell
2. `npm run prisma:seed` tekrar çalıştır

### API çalışmıyor:
1. Railway → Deployments
2. Logs'u kontrol et (hatalar orada)

### CORS hatası:
1. Railway → Variables
2. `CORS_ORIGIN` değerini kontrol et
3. Vercel frontend URL'i olmalı

---

## 📞 Yardım

Tüm adımları videolu anlatım gibi yazdım. 

Her adımda ne görmen gerektiğini yazdım.

Takıldığın yerde bu dosyaya bak!

---

**Başarılar! Sitenizi arkadaşlarınıza gösterin! 🎊**

