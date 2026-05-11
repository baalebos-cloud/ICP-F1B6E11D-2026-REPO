# DevOps Engineering Self-Learning Internship

**Organization:** InternCareerPath  
**Program:** DevOps Engineering Self-Learning Internship  
**Portal ID:** ICP-F1B6E11D-2026  
**Repo ID:** REPO-86C1D410  
**Intern:** baalebos-cloud  
**Duration:** 6 Weeks | Project-Based  
**GitHub:** [github.com/baalebos-cloud/REPO-86C1D410](https://github.com/baalebos-cloud/REPO-86C1D410)

---

## Projects Completed

| # | Project | Project Bank | Weeks | Status |
|---|---------|-------------|-------|--------|
| 1 | Shell Scripting Automation | #1 — Beginner | 2–3 | ✅ Complete |
| 2 | CI/CD Pipeline + React Dashboard | #3 — Intermediate | 4–5 | ✅ Complete |

---

## Repository Structure

```
REPO-86C1D410/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI — lint + build on pull requests
│       └── deploy.yml      # CD — auto-deploy to Vercel on merge
├── dashboard/              # React 18 dashboard app (Vite + Recharts)
├── Week1/                  # Foundation, environment setup, project selection
├── Week2/                  # Project 1 — shell scripts (backup, cleanup)
├── Week3/                  # Project 1 — complete (deploy, health-check, runbook)
├── Week4/                  # Project 2 — CI/CD pipeline + dashboard development
├── Week5/                  # Project 2 — complete + pipeline runbook
└── Week6/                  # Portfolio & final submission
```

---

## Week-by-Week Progress

| Week | Focus | Deliverables | Status |
|------|-------|-------------|--------|
| 1 | Foundation & Project Selection | Project selection doc, environment setup | ✅ |
| 2 | Project 1 Development | `backup.sh`, `cleanup.sh` | ✅ |
| 3 | Project 1 Completion | `deploy.sh`, `health-check.sh`, cron config, runbook | ✅ |
| 4 | Project 2 Development | React dashboard, GitHub Actions workflows | ✅ |
| 5 | Project 2 Completion | CI/CD pipeline live, pipeline runbook | ✅ |
| 6 | Portfolio & Final Submission | This README, Week6 portfolio doc | ✅ |

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| Shell | Bash 5+, Cron |
| App | React 18, Vite, Recharts, Lucide |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| OS | Ubuntu 24.04 (WSL2) |

---

## Live Dashboard

> _Deploy to Vercel and add your URL here. See [Week5/README.md](./Week5/README.md) for setup steps._

---

## Quick Start

```bash
# Clone
git clone https://github.com/baalebos-cloud/REPO-86C1D410.git
cd REPO-86C1D410

# Run dashboard locally
cd dashboard
npm install
npm run dev
# → http://localhost:5173

# Make scripts executable
chmod +x Week2/scripts/*.sh Week3/scripts/*.sh

# Test cleanup safely (no deletions)
sudo ./Week2/scripts/cleanup.sh --dry-run

# Run health check
./Week3/scripts/health-check.sh
```

---

## Runbooks

| Project | Runbook |
|---------|---------|
| Shell Scripting Automation | [Week3/runbook.md](./Week3/runbook.md) |
| CI/CD Pipeline | [Week5/runbook.md](./Week5/runbook.md) |

---

*InternCareerPath — Building Careers Through Practical Experience*
