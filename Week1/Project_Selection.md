# Project Selection — Week 1

**Intern:** baalebos-cloud  
**Portal ID:** ICP-F1B6E11D-2026  
**Repo ID:** REPO-86C1D410  
**Program:** DevOps Engineering Self-Learning Internship — InternCareerPath  
**Duration:** 6 Weeks | Project-Based

---

## Selected Projects

Two projects were selected from the InternCareerPath Project Bank.

---

### Project 1: Shell Scripting Automation *(Project Bank — #1)*

**Difficulty:** Beginner  
**Weeks:** 2–3  
**Real-World Problem:** Repetitive tasks need automation.

**Rationale:**  
Repetitive operations like backups, log cleanup, and deployments are foundational DevOps tasks. Before moving to higher-level tooling, mastering Bash scripting builds the operational instincts needed to understand what automation tools do under the hood. Linux is the backbone of most DevOps environments — this project directly addresses that foundation.

**Skills & Tools Applied:**
- Bash scripting with `set -euo pipefail` error handling
- Cron job scheduling
- Log management and rotation
- Structured error handling and dry-run modes

**Planned Deliverables:**
- `backup.sh` — automated directory backup with compression and rotation
- `cleanup.sh` — log and temp file cleanup with `--dry-run` mode
- `deploy.sh` — pull → build → restart deployment script with automatic rollback
- `health-check.sh` — service, endpoint, disk, memory, and CPU monitor
- `Week3/cron/crontab.example` — cron job configuration
- `Week3/runbook.md` — full operations runbook

---

### Project 2: CI/CD Pipeline *(Project Bank — #3)*

**Difficulty:** Intermediate  
**Weeks:** 4–5  
**Real-World Problem:** Code changes need automated testing and deployment.

**Rationale:**  
Automating the build-test-deploy cycle is the core of modern DevOps practice. Using GitHub Actions with Vercel deployment provides a real, production-grade pipeline. A React dashboard was built alongside the pipeline to visualise DevOps metrics — connecting both projects into a cohesive portfolio piece and demonstrating full-stack DevOps thinking.

**Skills & Tools Applied:**
- GitHub Actions (CI and CD workflows)
- Build stages: lint → build → deploy
- Deployment triggers on pull requests and merges
- Vercel CLI for production deployment

**Planned Deliverables:**
- `dashboard/` — React 18 app monitoring DevOps metrics (3 pages, live charts)
- `.github/workflows/ci.yml` — lint + build validation on every pull request
- `.github/workflows/deploy.yml` — auto-deploy to Vercel on merge to `main`
- `Week5/runbook.md` — full pipeline runbook

---

## Project Selection Summary

| # | Project Bank Entry | Difficulty | Weeks | Status |
|---|--------------------|------------|-------|--------|
| 1 | Shell Scripting Automation | Beginner | 2–3 | ✅ Selected |
| 2 | CI/CD Pipeline | Intermediate | 4–5 | ✅ Selected |

---

## Alignment with Evaluation Criteria

| Criteria | Weight | How These Projects Address It |
|----------|--------|-------------------------------|
| Concept Understanding | 20% | Scripts follow DevOps principles; pipeline uses proper CI/CD stages |
| Problem-Solving | 25% | Rollback on failure, dry-run mode, disk pre-flight checks, multi-stage pipeline |
| Quality & Originality | 25% | Structured logging, color output, modular design, live monitoring dashboard |
| Documentation | 15% | Runbooks for both projects; environment setup guide; this selection document |
| Consistency | 15% | Deliverables planned across all 6 weeks with clear week-by-week progression |

---

## Environment Setup

See [`environment-setup.md`](./environment-setup.md) for full setup instructions including Git, Node.js, SSH keys, and Vercel CLI.
