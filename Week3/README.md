# Week 3 — Shell Scripting: Complete ✅

## Project 1 Deliverables

| File | Description | Status |
|------|-------------|--------|
| `Week2/scripts/backup.sh` | Automated backup with rotation | ✅ |
| `Week2/scripts/cleanup.sh` | Log & temp file cleanup | ✅ |
| `Week3/scripts/deploy.sh` | Pull → Build → Restart with rollback | ✅ |
| `Week3/scripts/health-check.sh` | Service & resource health monitor | ✅ |
| `Week3/cron/crontab.example` | Cron job configuration | ✅ |
| `Week3/runbook.md` | Full operations runbook | ✅ |

## Summary

All four scripts are production-quality with:
- Structured logging (timestamps, color-coded levels)
- Error handling via `set -euo pipefail`
- Configurable via environment variables
- Idempotent — safe to run multiple times
- Tested via `--dry-run` where applicable

See [`runbook.md`](./runbook.md) for full usage documentation.
