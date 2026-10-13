# LUNA Deployment Guide — Panduan Lengkap

## 🎯 Tujuan Deployment

Deploy aplikasi ke production:
- **Frontend** (Next.js) → Vercel (CDN global, gratis untuk hobby)
- **Backend** (FastAPI) → Railway (VPS dengan PostgreSQL built-in)
- **Database** → PostgreSQL di Railway
- **Media Storage** → R2 (opsional, bisa pakai local `/tmp`)

---

## 📋 Checklist Pre-Deploy

Sebelum mulai, pastikan:
- ✅ Code sudah di GitHub (https://github.com/luciferKERO/LunaEditor)
- ✅ Local testing berhasil (http://localhost:3000 + backend)
- ✅ Tidak ada secrets di `.env` atau code
- ✅ `.env.production` sudah dibuat (template ada di repo)

---

## 🚀 STEP 1: Deploy Frontend ke Vercel

### 1.1 Persiapan Vercel Account

1. Buka https://vercel.com
2. Click **"Sign Up"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses repo GitHub kamu
5. Set username & password

### 1.2 Import Project

1. Dari dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Cari repo **`LunaEditor`** di list
3. Click **"Import"**

### 1.3 Configure Build Settings

Vercel akan auto-detect Next.js. Tapi pastikan settings benar:

**Framework Preset**: Next.js ✓ (auto-detected)

**Project Name**: `luna` (atau nama lain)

**Root Directory**: `.` (biarkan kosong/default = root)

**Build Command**: 
```
pnpm --filter web build
```

**Output Directory**: 
```
apps/web/.next
```

**Install Command**: 
```
pnpm install
```

### 1.4 Environment Variables (Frontend)

Klik **"Environment Variables"** dan add:

```
NEXT_PUBLIC_API_URL = https://luna-api-xxx.railway.app
```

**PENTING**: 
- Ganti `luna-api-xxx.railway.app` dengan actual URL dari Railway (nanti kita dapat setelah deploy backend)
- Untuk sekarang, bisa isi placeholder dulu, update nanti
- Name harus start dengan `NEXT_PUBLIC_` agar accessible dari browser

### 1.5 Deploy

Click **"Deploy"** dan tunggu ~3-5 menit.

Result:
- Frontend live di: `https://luna-xxxx.vercel.app` (auto-generated domain)
- Atau bisa custom domain nanti di Settings

### 1.6 Post-Deploy: Update API URL

Setelah Railway deploy (step 2), kembali ke Vercel:
1. Dashboard → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_API_URL` dengan actual Railway API URL
3. Klik redeploy untuk apply changes

---

## 🚀 STEP 2: Deploy Backend ke Railway

### 2.1 Persiapan Railway Account

1. Buka https://railway.app
2. Click **"Start Project"**
3. Pilih **"Deploy from GitHub repo"** (atau **"I have a GitHub repo"**)
4. Authorize Railway untuk GitHub access
5. Set GitHub org/email

### 2.2 Create New Project

1. Click **"Create Project"** atau **"New Project"** (dari dashboard)
2. Pilih **"Deploy from GitHub Repo"**
3. Cari & select **`LunaEditor`** repo
4. Click **"Deploy Now"**

### 2.3 Configure Services

Setelah repo terhubung, Railway akan detect services:

#### Service 1: API (apps/api)

Klik **"API"** service:
- **Name**: `luna-api` (atau apalah)
- **Root Directory**: `apps/api` (jika auto-detect salah, set manual)
- **Dockerfile**: Existing Dockerfile (auto-detected)

#### Service 2: Add PostgreSQL Database

Dari project view, klik **"+ Add Service"** → **"PostgreSQL"**

Railway akan create container baru dengan PostgreSQL 16:
- Username: `postgres`
- Password: auto-generated (Railway handle)
- Database: `postgres` (default)
- Port: `5432`

#### Service 3: Add Redis (Optional)

Dari project view, klik **"+ Add Service"** → **"Redis"**

(Nanti env var otomatis tersedia sebagai `REDIS_URL`)

### 2.4 Configure Environment Variables

Untuk **API service**, klik service → **"Variables"** tab:

Klik **"Add Variable"** dan isi:

```
DATABASE_URL = postgresql://postgres:PASSWORD@host:5432/postgres
REDIS_URL = redis://host:6379
SECRET_KEY = (random 32-char string)
NEXTAUTH_SECRET = (random 32-char string)
NEXTAUTH_URL = https://luna-xxxx.vercel.app
NEXT_PUBLIC_API_URL = https://api-xxx.railway.app
```

**Cara dapat values:**

1. **DATABASE_URL** — Railway otomatis provide via **"Connect"** button di PostgreSQL service
   - Click PostgreSQL service → **"Connect"** tab
   - Copy PostgreSQL connection string (format: `postgresql://...`)

2. **REDIS_URL** — Sama, dari Redis service connection tab

3. **SECRET_KEY** & **NEXTAUTH_SECRET** — Generate random:
   ```bash
   # Di terminal lokal
   openssl rand -hex 32
   # Output: xxxxx (copy-paste ke Railway)
   ```

4. **NEXTAUTH_URL** — URL frontend Vercel (e.g., `https://luna-xxxx.vercel.app`)

5. **NEXT_PUBLIC_API_URL** — Akan jadi Railway API URL (lihat di step 2.5)

### 2.5 Deploy & Get API URL

1. Railway akan auto-build dari Dockerfile
2. Tunggu deployment selesai (~2-5 min)
3. Setelah sukses, buka **API service** → **"Deployment"** tab
4. Cari **"Public URL"** atau **"Domain"** — ini adalah Railway API URL
   - Format: `https://lunaeditor-production-xxxx.railway.app`
   - Atau custom domain: `https://api-yourdomain.com`

5. **Copy URL ini** — dipakai untuk:
   - Update `NEXT_PUBLIC_API_URL` di Vercel env vars
   - Backend `NEXTAUTH_URL` (already set)

### 2.6 Update & Redeploy

Setelah dapat Railway API URL:

1. Kembali ke **Vercel** → Settings → Environment Variables
2. Edit `NEXT_PUBLIC_API_URL` dengan actual Railway URL
3. Click **"Redeploy"** untuk apply changes

---

## ✅ Testing After Deployment

### 1. Test Backend Health

```bash
curl https://api-xxx.railway.app/health
# Expected response: {"status":"ok","service":"luna-api"}
```

### 2. Test Frontend Load

Buka https://luna-xxxx.vercel.app di browser:
- Homepage harus load (no 404)
- Sidebar + layout terlihat
- Click **"Projects"** → should fetch dari API

### 3. Test API Connectivity

Di browser console (F12):
```javascript
fetch('https://api-xxx.railway.app/api/projects')
  .then(r => r.json())
  .then(data => console.log(data))
```

Expected: Array kosong atau list projects (dari database)

### 4. Troubleshoot

| Error | Fix |
|-------|-----|
| **404 Projects page** | Check `NEXT_PUBLIC_API_URL` di Vercel env. Redeploy frontend |
| **CORS error** | Vercel domain tidak di `allow_origins` di FastAPI. Add ke `apps/api/main.py` |
| **"Cannot connect to database"** | Check `DATABASE_URL` di Railway, pastikan PostgreSQL service running |
| **"Connection refused"** | API service mungkin belum ready. Tunggu 30s setelah deploy, refresh |
| **Slow first request (~10s)** | Normal. Railway free tier "sleeps" inactive servers. Paid tier tidak |

---

## 📦 Optional: Setup Custom Domain

### Vercel Custom Domain

1. Dashboard → Project Settings → Domains
2. Add **`yourdomain.com`**
3. Follow DNS setup instructions (add CNAME record ke domain registrar)
4. Vercel auto-provision SSL (Let's Encrypt)

### Railway Custom Domain

Sama caranya:
1. API service → Settings → Domains
2. Add domain & update DNS

---

## 🔐 Production Checklist

- [ ] Backend responding to `/health` ✓
- [ ] Frontend loads without errors ✓
- [ ] `/projects` page fetches dari API ✓
- [ ] No console errors (F12) ✓
- [ ] API URL in Vercel env vars correct ✓
- [ ] Database connected (can create projects) ✓
- [ ] Redis ready (optional, for job queue) ✓
- [ ] Secrets (`SECRET_KEY`, `NEXTAUTH_SECRET`) strong & random ✓
- [ ] R2 credentials (optional, for media uploads) ✓
- [ ] CORS allow list includes Vercel domain ✓

---

## 📊 Cost Estimate (Monthly)

| Service | Pricing | Notes |
|---------|---------|-------|
| **Vercel** | Free | Unlimited hobby projects, 100GB bandwidth/month |
| **Railway** | Free tier + pay-as-you-go | $5 starter credit, ~$5-10/month for small app |
| **PostgreSQL** | Included in Railway | Free on Railway starter |
| **R2 Storage** | $0.015/GB | Optional. ~$1-2/month for small media |
| **Redis** | Included in Railway | Free on starter, optional |
| **Total** | ~$5-10/month | Can start free (free tier) |

---

## 🆘 If Something Goes Wrong

### Check Logs

**Vercel Logs**:
- Dashboard → Deployments → Click deployment → Logs tab
- See build errors or runtime issues

**Railway Logs**:
- API service → Deployment tab → View logs
- Real-time output dari uvicorn (backend)

### Common Issues & Fixes

1. **Build failed** → Check `apps/api/requirements.txt` (pip version conflicts)
2. **API not found** → Rebuild Dockerfile, check `railway.toml`
3. **Database error** → PostgreSQL service stopped? Restart di Railway dashboard
4. **Timeout** → Cold start normal, wait 30s. Upgrade plan if persistent
5. **CORS blocked** → Add Vercel domain to FastAPI `allow_origins` in `apps/api/main.py`

---

## 🎓 Next Steps After Deploy

1. **Monitor** → Set up Railway alerts (CPU, memory, logs)
2. **Backup** → PostgreSQL automated backups (Railway handles)
3. **Scaling** → If slow, upgrade Railway plan ($10+ tier)
4. **CI/CD** → Push to `main` auto-redeploys both services
5. **Feature Development** → Keep building, push commits, auto-deploy

---

**Waktu total setup**: ~15-20 menit (first time)
**Waktu deployment**: ~5 menit
**Cost**: Gratis tahun pertama (free tier), $5-10/bulan setelahnya

Siap deploy? Mulai dari STEP 1 👆
