# Week 4 — CI/CD Pipeline: Development

## Progress

This week focused on building the React dashboard app and structuring the GitHub Actions workflows.

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

## Running Locally

```bash
cd dashboard
npm install
npm run dev
# Open http://localhost:5173
```

## Next Steps (Week 5)

- Add Vercel secrets to GitHub
- Trigger first deployment
- Document the full pipeline runbook
