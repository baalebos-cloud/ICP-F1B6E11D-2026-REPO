# Week 6 — Portfolio & Final Submission

**Intern:** baalebos-cloud  
**Portal ID:** ICP-F1B6E11D-2026  
**Repo ID:** REPO-86C1D410  
**Program:** DevOps Engineering Self-Learning Internship — InternCareerPath

---

## Summary

This repository is the final submission for the **InternCareerPath DevOps Engineering Self-Learning Internship** (ICP-F1B6E11D-2026).

Over 6 weeks, two production-quality DevOps projects were independently researched, built, tested, and documented — fulfilling all program completion requirements.

---

## Completion Requirements Checklist

| Requirement | Status |
|-------------|--------|
| Minimum 2 completed projects | ✅ 2 projects completed |
| Reproducible automation | ✅ All scripts are idempotent and env-var configurable |
| Proper documentation and runbooks | ✅ Runbooks in Week3 and Week5 |
| Active participation across 6 weeks | ✅ Deliverables in every week folder |
| Single GitHub repository | ✅ REPO-86C1D410 |
| Separate folders per week | ✅ Week1 through Week6 |

---

## Project 1: Shell Scripting Automation

**Project Bank:** #1 | **Difficulty:** Beginner | **Weeks:** 2–3

**Problem Solved:** Repetitive DevOps operations (backups, log cleanup, deployments, health monitoring) were automated with production-quality Bash scripts.

| Script | Location | Task |
|--------|----------|------|
| `backup.sh` | `Week2/scripts/` | Directory backup with tar+gzip compression and rotation |
| `cleanup.sh` | `Week2/scripts/` | Log and temp file cleanup with `--dry-run` mode |
| `deploy.sh` | `Week3/scripts/` | Full pull → build → restart with automatic rollback |
| `health-check.sh` | `Week3/scripts/` | Service, endpoint, disk, memory, and CPU monitoring |
| `crontab.example` | `Week3/cron/` | Cron job scheduling for all scripts |

**Best Practices Applied:**
- `set -euo pipefail` on all scripts — strict error mode
- Structured timestamped logging with color-coded levels
- Environment variable configuration — no hardcoded values
- Idempotent design — safe to run multiple times
- `--dry-run` flag on destructive operations

**Runbook:** [Week3/runbook.md](../Week3/runbook.md)

---

## Project 2: CI/CD Pipeline + React Dashboard

**Project Bank:** #3 | **Difficulty:** Intermediate | **Weeks:** 4–5

**Problem Solved:** Code changes are automatically validated and deployed to production without manual intervention, with a live dashboard to monitor the system.

| Deliverable | Location | Description |
|-------------|----------|-------------|
| React Dashboard | `dashboard/` | 3-page DevOps monitoring app (Overview, Pipeline, Scripts) |
| CI Workflow | `.github/workflows/ci.yml` | Lint + build validation on every pull request |
| CD Workflow | `.github/workflows/deploy.yml` | Auto-deploy to Vercel on every merge to `main` |

**Pipeline Stages:**
```
Pull Request  →  Lint (ESLint)  →  Build (Vite)  →  ✅ PR approved
Merge to main →  Install  →  Build  →  Vercel Deploy  →  🌐 Live
```

**Live Dashboard:** _Add Vercel URL after first deploy_

**Runbook:** [Week5/runbook.md](../Week5/runbook.md)

---

## Skills Demonstrated

| Skill | Tools Used | Project |
|-------|-----------|---------|
| Bash scripting & error handling | Bash 5, `set -euo pipefail` | Shell Scripts |
| Cron job scheduling | Crontab | Shell Scripts |
| Log management & rotation | `find`, `tail`, `tar` | Shell Scripts |
| CI/CD pipeline design | GitHub Actions | Pipeline |
| Build automation | Vite, npm | Pipeline |
| Cloud deployment | Vercel CLI | Pipeline |
| Frontend development | React 18, Recharts | Dashboard |
| Technical documentation | Markdown runbooks | Both |

---

## Evaluation Criteria — Self-Assessment

| Criteria | Weight | Evidence |
|----------|--------|----------|
| Concept Understanding | 20% | Scripts follow DevOps principles; pipeline uses proper CI/CD stages with lint → build → deploy progression |
| Problem-Solving | 25% | Automatic rollback on deploy failure; `--dry-run` mode; disk pre-flight checks; multi-stage pipeline with artifact upload |
| Quality & Originality | 25% | Structured logging with color-coded levels; modular script design; live React dashboard with real-time metric simulation |
| Documentation | 15% | Full runbooks for both projects; environment setup guide; project selection document; this portfolio README |
| Consistency | 15% | Deliverables present in all 6 week folders; both projects fully completed with tests and documentation |

---

## Repository Links

- **GitHub:** [https://github.com/baalebos-cloud/REPO-86C1D410](https://github.com/baalebos-cloud/REPO-86C1D410)
- **Live Dashboard:** _Add Vercel URL after first deploy_

---

*InternCareerPath — Building Careers Through Practical Experience*
