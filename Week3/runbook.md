# Runbook — Shell Scripting Automation

**Project:** Shell Scripting Automation  
**Completed:** Week 3  
**Author:** InternCareerPath DevOps Internship

---

## Overview

This runbook documents all automation scripts, their configuration, usage, and troubleshooting steps. It is written so any team member can operate these scripts without needing the original author.

---

## Scripts Reference

### 1. `backup.sh`

**Purpose:** Compresses and archives specified directories. Removes backups older than the retention period.

**Location:** `Week2/scripts/backup.sh`

**Configuration (edit inside script or via env vars):**

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKUP_SOURCES` | `/var/www`, `/etc/nginx`, `~/projects` | Directories to back up |
| `BACKUP_DEST` | `/var/backups/devops` | Where archives are stored |
| `RETENTION_DAYS` | `7` | Days to keep old backups |
| `LOG_FILE` | `/var/log/devops-backup.log` | Log output path |

**Usage:**
```bash
# Standard run
sudo ./Week2/scripts/backup.sh

# Custom destination
BACKUP_DEST=/mnt/external-drive ./Week2/scripts/backup.sh

# Verify archives
ls -lh /var/backups/devops/
```

**Expected output:**
```
2026-01-15 02:00:01 [INFO ] Preflight checks passed.
2026-01-15 02:00:02 [OK   ] Backup complete: /var/backups/devops/var_www_20260115_020001.tar.gz (45M)
2026-01-15 02:00:03 [OK   ] All backups completed successfully.
```

**Troubleshooting:**

| Issue | Cause | Fix |
|-------|-------|-----|
| `Cannot create backup destination` | Permission denied | Run with `sudo` or fix directory ownership |
| `Source not found, skipping` | Path doesn't exist | Update `BACKUP_SOURCES` in script |
| Low disk space warning | Disk filling up | Reduce `RETENTION_DAYS` or add more storage |

---

### 2. `cleanup.sh`

**Purpose:** Removes old logs, truncates oversized log files, cleans temp directories.

**Location:** `Week2/scripts/cleanup.sh`

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_RETENTION_DAYS` | `14` | Log files older than this are deleted |
| `TEMP_RETENTION_HOURS` | `24` | Temp files older than this are deleted |
| `MAX_LOG_SIZE_MB` | `100` | Logs larger than this get truncated |
| `DRY_RUN` | `false` | Set to `true` to preview without deleting |

**Usage:**
```bash
# Preview what would be deleted (safe)
sudo ./Week2/scripts/cleanup.sh --dry-run

# Run cleanup
sudo ./Week2/scripts/cleanup.sh

# Custom retention
LOG_RETENTION_DAYS=30 ./Week2/scripts/cleanup.sh
```

**Always run with `--dry-run` first on production systems.**

---

### 3. `deploy.sh`

**Purpose:** Automates pull → install → build → restart. Supports rollback to previous release.

**Location:** `Week3/scripts/deploy.sh`

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_DIR` | `/var/www/app` | Application directory |
| `BRANCH` | `main` | Git branch to deploy |
| `SERVICE_NAME` | `myapp` | systemd/PM2 service name |
| `BUILD_CMD` | `npm run build` | Build command |
| `INSTALL_CMD` | `npm ci --production` | Install command |

**Usage:**
```bash
# Deploy latest main branch
APP_DIR=/var/www/myapp SERVICE_NAME=myapp ./Week3/scripts/deploy.sh

# Rollback to previous release
./Week3/scripts/deploy.sh rollback
```

**Rollback strategy:** The script keeps the last 5 releases in `.releases/`. On failure, it automatically triggers rollback via `trap`.

---

### 4. `health-check.sh`

**Purpose:** Checks services, HTTP endpoints, disk, memory, and CPU. Returns exit code 0 (ok), 1 (warnings), or 2 (critical).

**Location:** `Week3/scripts/health-check.sh`

**Configuration:**

| Variable | Default | Description |
|----------|---------|-------------|
| `SERVICES` | `nginx ssh` | systemd services to verify |
| `HTTP_ENDPOINTS` | `localhost:3000`, `:80` | URLs to probe |
| `DISK_WARN_PERCENT` | `80` | Disk usage warning threshold |
| `MEM_WARN_PERCENT` | `85` | Memory usage warning threshold |
| `ALERT_EMAIL` | (empty) | Email to alert on failure |

**Usage:**
```bash
./Week3/scripts/health-check.sh
echo "Exit code: $?"   # 0=ok, 1=warnings, 2=critical

# With email alerts
ALERT_EMAIL=admin@example.com ./Week3/scripts/health-check.sh
```

---

## Cron Setup

```bash
# Open crontab editor
crontab -e

# Paste contents of Week3/cron/crontab.example
# Update /path/to/repo to your actual repo path

# Verify
crontab -l
```

---

## Logs

| Script | Log File |
|--------|----------|
| backup.sh | `/var/log/devops-backup.log` |
| cleanup.sh | `/var/log/devops-cleanup.log` |
| deploy.sh | `/var/log/devops-deploy.log` |
| health-check.sh | `/var/log/devops-health.log` |

```bash
# Follow logs in real time
tail -f /var/log/devops-health.log
```

---

## Permissions

```bash
# Make all scripts executable
chmod +x Week2/scripts/*.sh Week3/scripts/*.sh
```
