# Week 4 — Project 2 Development: CI/CD Pipeline

**Portal ID:** ICP-F1B6E11D-2026 | **Project Bank:** #3 — CI/CD Pipeline

## Overview

This week focused on building the React dashboard app and structuring the GitHub Actions CI/CD workflows — the development phase of Project 2.

---

## Work Done

### React Dashboard App (`/dashboard`)

Built a production-ready DevOps monitoring dashboard with three pages:

| Page | Description |
|------|-------------|
| **Overview** | Live metrics (CPU, Memory, Disk, Uptime), resource usage charts, deployment table |
| **CI/CD Pipeline** | Pipeline run history, build time trends, per-stage breakdown |
| **Shell Scripts** | Documentation view of all Project 1 scripts with cron schedule |

**Tech stack:** React 18 · Vite · Recharts · Lucide icons

### GitHub Actions Workflows

| File | Trigger | Purpose |
|------|---------|---------| 
| `ci.yml` | PR to `main` | Lint + Build validation |
| `deploy.yml` | Push to `main` | Deploy to Vercel production |

---

## Running Locally

```bash
cd dashboard
npm install
npm run dev
# Open http://localhost:5173
```

---

## Technical Notes

- Dashboard uses mock data with `setInterval` to simulate live metric updates
- CI workflow runs ESLint with `--max-warnings 0` — zero tolerance for lint warnings
- CD workflow uses Vercel CLI (`vercel pull` → `vercel build` → `vercel deploy --prebuilt`) for reliable production deploys
- Both workflows use `actions/setup-node@v4` with npm cache keyed to `package-lock.json`

---

## Week 5 Completion

- ✅ Added Vercel secrets to GitHub (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`)
- ✅ Triggered first deployment via CD workflow
- ✅ Documented the full pipeline runbook — see [`Week5/runbook.md`](../Week5/runbook.md)
