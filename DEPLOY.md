# LUNA Deployment Guide

## 1. Pre-Deploy Checklist

- [ ] Code tested locally (pnpm dev + python backend)
- [ ] `/projects` page loads (fix applied)
- [ ] BGM assets indexed (69 tracks available)
- [ ] No secrets in .env or code
- [ ] Git initialized and clean

## 2. GitHub Setup

```bash
# If repo doesn't exist
git init
git remote add origin https://github.com/YOUR_USER/luna.git

# Commit & push
git add .
git commit -m "feat: complete LUNA AI video editor with projects page & production config"
git push -u origin main
```

## 3. Vercel Deploy (Frontend)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo `luna`
3. **Framework Preset**: Next.js
4. **Root Directory**: `.` (root; Vercel auto-detects monorepo)
5. **Build Command**: `pnpm --filter web build`
6. **Output Directory**: `apps/web/.next`
7. **Install Command**: `pnpm install`
8. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = `https://luna-api-xxx.railway.app` (from Railway, fill after backend deploy)
9. Click **Deploy**

**Result**: Frontend lives at `https://luna.vercel.app` (or your domain)

## 4. Railway Deploy (Backend)

1. Go to [railway.app](https://railway.app)
2. **New Project** > **GitHub Repo**
3. Select `luna` repo
4. Wait for Railway to detect services
5. **Add Plugins**:
   - PostgreSQL 16
   - Redis 7
6. **Configure Environment**:
   - `DATABASE_URL` → copy from PostgreSQL plugin
   - `REDIS_URL` → copy from Redis plugin  
   - `SECRET_KEY` → generate: `openssl rand -hex 32`
   - `NEXTAUTH_SECRET` → generate: `openssl rand -hex 32`
   - `NEXTAUTH_URL` = `https://luna.vercel.app`
   - `NEXT_PUBLIC_API_URL` = Railway API URL (output after deploy)
7. **railway.toml** auto-configures start command
8. Click **Deploy**

**Result**: Backend lives at `https://luna-api-xxx.railway.app`

## 5. Post-Deploy

1. **Update Vercel env var**: Add `NEXT_PUBLIC_API_URL` with Railway API URL
2. **Trigger Vercel redeploy**: Push empty commit or redeploy from dashboard
3. **Test health**: `curl https://luna-api-xxx.railway.app/health`
4. **Test frontend**: Visit `https://luna.vercel.app/projects`

## 6. Optional: Custom Domain

- **Vercel**: Add domain in Project Settings
- **Railway**: Add domain in Environment/Domains

## 7. Storage (Optional)

For production uploads, configure R2:
1. Create Cloudflare R2 bucket
2. Generate API token
3. Add to Railway env:
   - `R2_ENDPOINT` = `https://xxxx.r2.cloudflarestorage.com`
   - `R2_ACCESS_KEY` = token
   - `R2_SECRET_KEY` = token
   - `R2_BUCKET` = bucket name

Without R2, uploads use `/tmp` (ephemeral — lost on restart). Use R2 for production.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API returns 404 | Check `NEXT_PUBLIC_API_URL` in Vercel env |
| CORS errors | Verify `CORS allow_origins` in FastAPI includes Vercel domain |
| Database not found | Ensure Railway PostgreSQL is running; check `DATABASE_URL` |
| BGM 404 | Assets must be in `git` (Docker volume mounts from repo) |
| Slow first request | Cold start normal; Railway warms up after ~10s |

## Local Testing Before Deploy

```bash
# Test with prod config
DATABASE_URL=postgresql+asyncpg://luna:luna@localhost:5432/luna pnpm run build
cd apps/api && python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

**Timeline**: ~10-15 min total (after git push)
