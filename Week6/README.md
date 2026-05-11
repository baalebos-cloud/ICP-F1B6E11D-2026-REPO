# Week 6 — Portfolio & Final Submission

## Summary

This repository represents the completion of the **InternCareerPath DevOps Self-Learning Internship** (ICP-F1B6E11D-2026).

Over 6 weeks, two production-quality DevOps projects were researched, built, tested, and documented.

---

## Projects Completed

### Project 1: Shell Scripting Automation
**Difficulty:** Beginner | **Week:** 2–3

Four Bash scripts automating core DevOps operational tasks:

| Script | Task |
|--------|------|
| `backup.sh` | Directory backup with compression and rotation |
| `cleanup.sh` | Log and temp file cleanup with dry-run |
| `deploy.sh` | Full pull → build → restart with rollback |
| `health-check.sh` | Service, endpoint, disk, memory, CPU monitoring |

All scripts follow best practices: `set -euo pipefail`, structured logging, env-var configuration, and cron scheduling.

---

### Project 2: CI/CD Pipeline + React Dashboard
**Difficulty:** Intermediate | **Week:** 4–5

A complete automated pipeline deploying a React app to Vercel:

- **App:** React 18 dashboard monitoring DevOps metrics (3 pages, live charts, data tables)
- **CI:** GitHub Actions runs lint + build on every pull request
- **CD:** Every merge to `main` auto-deploys to Vercel production

**Live URL:** _[Add your Vercel URL here]_

---

## Skills Demonstrated

| Skill | Project |
|-------|---------|
| Bash scripting, error handling | Shell Scripts |
| Cron job scheduling | Shell Scripts |
| Log management & rotation | Shell Scripts |
| React 18 + Vite | Dashboard |
| Data visualization (Recharts) | Dashboard |
| GitHub Actions CI/CD | Pipeline |
| Vercel deployment | Pipeline |
| Technical documentation & runbooks | Both |

---

## Evaluation Criteria Addressed

| Criteria | Evidence |
|----------|----------|
| Concept Understanding (20%) | All scripts follow DevOps principles; pipeline uses proper CI/CD stages |
| Problem-Solving (25%) | Rollback on deploy failure, dry-run mode, disk pre-flight checks |
| Quality & Originality (25%) | Structured logging, color output, modular design, live dashboard |
| Documentation (15%) | Runbooks in Week3 and Week5; this portfolio README |
| Consistency (15%) | All 6 weeks have deliverables; both projects fully completed |

---

## Repository Links

- **GitHub:** `https://github.com/<your-username>/REPO-86C1D410`
- **Live Dashboard:** `<vercel-url>`

---

*InternCareerPath — Building Careers Through Practical Experience*
