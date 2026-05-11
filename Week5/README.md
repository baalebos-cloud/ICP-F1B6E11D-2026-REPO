# Week 5 — CI/CD Pipeline: Complete ✅

## Project 2 Deliverables

| Deliverable | Status |
|-------------|--------|
| React dashboard app (`/dashboard`) | ✅ |
| CI workflow — lint + build on PRs | ✅ |
| CD workflow — auto-deploy to Vercel | ✅ |
| Pipeline runbook | ✅ |

## Pipeline Architecture

```
Developer pushes commit
        │
        ▼
  GitHub Repository
        │
        ├── Pull Request → CI Workflow
        │        ├── npm ci
        │        ├── eslint lint
        │        └── vite build
        │
        └── Merge to main → CD Workflow
                 ├── npm ci
                 ├── vite build
                 ├── vercel pull
                 ├── vercel build --prod
                 └── vercel deploy --prod → 🌐 Live URL
```

## Setting Up Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Value |
|--------|-------|
| `VERCEL_TOKEN` | From vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | From `dashboard/.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | From `dashboard/.vercel/project.json` → `projectId` |

### Get your Vercel IDs:
```bash
cd dashboard
npm install -g vercel
vercel login
vercel link          # follow prompts, select your project
cat .vercel/project.json
```

## Triggering a Deploy

Every push to `main` triggers the CD pipeline automatically. You can also trigger manually:

**GitHub UI:** Actions tab → "CD — Deploy to Vercel" → Run workflow

## Vercel Project Configuration

In your Vercel dashboard, set:

| Setting | Value |
|---------|-------|
| Root Directory | `dashboard` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm ci` |
| Node.js Version | `20.x` |
