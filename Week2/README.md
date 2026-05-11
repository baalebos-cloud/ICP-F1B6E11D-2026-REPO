# Week 2 — Project 1 Development: Shell Scripting

**Portal ID:** ICP-F1B6E11D-2026 | **Project Bank:** #1 — Shell Scripting Automation

## Overview

This week focused on building the core automation scripts: backup and cleanup.

## Scripts Developed

### `backup.sh`
- Backs up configurable source directories
- Compresses archives with `tar + gzip`
- Implements **log rotation** — removes backups older than N days
- Disk space pre-flight check
- Detailed structured logging with timestamps

### `cleanup.sh`
- Removes old log files past retention threshold
- Truncates oversized logs (keeps last 1000 lines)
- Cleans stale temp files from `/tmp` and `/var/tmp`
- Removes empty directories
- Supports `--dry-run` flag for safe testing
- Generates disk usage report

## Key Concepts Practiced

| Concept | Applied In |
|---------|-----------|
| `set -euo pipefail` | Both scripts — strict error mode |
| `find` with `-mtime`/`-amin` | Log and temp cleanup |
| `tar -czf` | Backup compression |
| `tee` for dual logging | Both scripts |
| Color-coded terminal output | Both scripts |
| Dry-run mode | `cleanup.sh` |

## Testing

```bash
chmod +x Week2/scripts/*.sh

# Test cleanup in dry-run (safe, no deletions)
sudo ./Week2/scripts/cleanup.sh --dry-run

# Test backup (update BACKUP_SOURCES in script first)
BACKUP_DEST=/tmp/test-backups ./Week2/scripts/backup.sh
```

## Next Steps (Week 3)
- Build `deploy.sh` and `health-check.sh`
- Configure cron jobs
- Write the full runbook
