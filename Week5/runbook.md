# Runbook — CI/CD Pipeline

**Project:** CI/CD Pipeline + React Dashboard  
**Completed:** Week 5  
**Author:** InternCareerPath DevOps Internship

---

## Overview

This runbook documents the full CI/CD pipeline: how it works, how to configure it, how to trigger deployments, and how to troubleshoot failures. It is written so any team member can operate the pipeline without needing the original author.

---

## Architecture

```
Developer pushes commit
        │
        ▼
  GitHub Repository
        │
        ├── Pull Request → CI Workflow (ci.yml)
        │        ├── npm ci
        │        ├── eslint lint
        │        └── vite build
        │
        └── Merge to main → CD Workflow (deploy.yml)
                 ├── npm ci
                 ├── vite build
                 ├── vercel pull --environment=production
                 ├── vercel build --prod
                 └── vercel deploy --prebuilt --prod → 🌐 Live URL
```

---

## Workflows Reference

### 1. CI Workflow (`ci.yml`)

**Trigger:** Pull requests targeting `main`  
**Purpose:** Validates every PR passes lint and build before merge is allowed.

**Steps:**

| Step | Command | Purpose |
|------|---------|---------|
| Checkout | `actions/checkout@v4` | Fetch repo code |
| Node setup | `actions/setup-node@v4` (v20) | Install Node with npm cache |
| Install | `npm ci` | Clean install from lock file |
| Lint | `npm run lint` | ESLint — zero warnings allowed |
| Build | `npm run build` | Vite production build |
| Upload artifact | `actions/upload-artifact@v4` | Save `dist/` for 7 days |

**Expected duration:** ~1–2 minutes

---

### 2. CD Workflow (`deploy.yml`)

**Trigger:** Push to `main` branch, or manual dispatch from GitHub Actions tab  
**Purpose:** Automatically deploys the dashboard to Vercel production on every merge.

**Steps:**

| Step | Command | Purpose |
|------|---------|---------|
| Checkout | `actions/checkout@v4` | Fetch repo code |
| Node setup | `actions/setup-node@v4` (v20) | Install Node with npm cache |
| Install | `npm ci` | Clean install from lock file |
| Build | `npm run build` | Local Vite build |
| Vercel CLI | `npm install -g vercel@latest` | Install Vercel CLI |
| Pull env | `vercel pull --yes --environment=production` | Sync Vercel project config |
| Vercel build | `vercel build --prod` | Build via Vercel |
| Deploy | `vercel deploy --prebuilt --prod` | Push to Vercel production |

**Expected duration:** ~2–3 minutes

---

## Required GitHub Secrets

Go to: **Repo → Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Where to get it |
|-------------|-----------------|
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens → Create |
| `VERCEL_ORG_ID` | `dashboard/.vercel/project.json` → `orgId` field |
| `VERCEL_PROJECT_ID` | `dashboard/.vercel/project.json` → `projectId` field |

### Getting Vercel IDs:
```bash
cd dashboard
npm install -g vercel
vercel login
vercel link        # Follow prompts, select or create your project
cat .vercel/project.json
# { "orgId": "team_xxx", "projectId": "prj_yyy" }
```

---

## Vercel Project Settings

In your Vercel dashboard (vercel.com → Project → Settings → General):

| Setting | Value |
|---------|-------|
| Root Directory | `dashboard` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Node.js Version | `20.x` |

---

## Triggering a Deployment

### Automatic
Every push or merge to `main` triggers the CD workflow automatically.

### Manual
1. Go to your GitHub repo → **Actions** tab
2. Select **"CD — Deploy to Vercel"**
3. Click **"Run workflow"** → **"Run workflow"**

---

## Monitoring

### GitHub Actions
- Go to repo → **Actions** tab to see all workflow runs
- Click any run to see step-by-step logs
- Failed steps are highlighted in red with full error output

### Vercel Dashboard
- vercel.com → your project → **Deployments** tab
- Shows every deployment with URL, status, and build logs
- Each deployment gets a unique preview URL

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `npm ci` fails | Missing or outdated `package-lock.json` | Run `npm install` locally and commit the lock file |
| Lint fails | ESLint errors in `src/` | Run `npm run lint` locally and fix all warnings |
| Build fails | JSX/import error | Run `npm run build` locally to reproduce |
| `VERCEL_TOKEN` error | Secret not set or expired | Regenerate token at vercel.com and update secret |
| `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` error | Wrong values | Re-run `vercel link` and re-copy from `.vercel/project.json` |
| Deploy succeeds but site is blank | Wrong `Root Directory` in Vercel | Set Root Directory to `dashboard` in Vercel project settings |

---

## Rollback

To roll back to a previous deployment:

1. Go to vercel.com → your project → **Deployments**
2. Find the last known-good deployment
3. Click the **"..."** menu → **"Promote to Production"**

This instantly promotes the old build to production with zero downtime.

---

## Logs

| Workflow | Where to find logs |
|----------|--------------------|
| CI | GitHub → Actions → "CI — Lint & Build" → latest run |
| CD | GitHub → Actions → "CD — Deploy to Vercel" → latest run |
| Live app | Vercel dashboard → Deployments → Functions/Runtime logs |
