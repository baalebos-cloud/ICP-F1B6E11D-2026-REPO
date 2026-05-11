# Week 1 — Foundation & Project Selection

**Portal ID:** ICP-F1B6E11D-2026 | **Intern:** baalebos-cloud

## Overview

This week covers Linux fundamentals review, Git setup, and formal project selection from the InternCareerPath Project Bank.

## Deliverables

| Deliverable | File | Status |
|-------------|------|--------|
| Project selection document | [`Project_Selection.md`](./Project_Selection.md) | ✅ |
| Environment setup guide | [`environment-setup.md`](./environment-setup.md) | ✅ |

## Selected Projects

### Project 1: Shell Scripting Automation *(Project Bank #1 — Beginner)*
**Weeks:** 2–3

Repetitive operations like backups, log cleanup, and deployments are foundational DevOps tasks. Mastering Bash scripting is essential before moving to higher-level tooling.

**Planned Deliverables:**
- `backup.sh` — automated directory backup with rotation
- `cleanup.sh` — log and temp file cleanup with dry-run
- `deploy.sh` — pull → build → restart deployment script with rollback
- `health-check.sh` — service and resource health monitor
- Cron job configuration
- Full operations runbook

### Project 2: CI/CD Pipeline *(Project Bank #3 — Intermediate)*
**Weeks:** 4–5

Automating the build-test-deploy cycle is the core of modern DevOps. Using GitHub Actions with Vercel deployment provides a real, production-grade pipeline.

**Planned Deliverables:**
- React 18 dashboard app (monitors mock DevOps metrics)
- GitHub Actions CI workflow (lint + build on PRs)
- GitHub Actions CD workflow (auto-deploy to Vercel on merge to `main`)
- Pipeline documentation and runbook

---

## Environment Setup

See [`environment-setup.md`](./environment-setup.md) for full setup instructions.
