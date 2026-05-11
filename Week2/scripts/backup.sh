#!/usr/bin/env bash
# =============================================================================
# backup.sh — Automated Directory Backup with Rotation
# Project: Shell Scripting Automation | InternCareerPath DevOps Internship
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
BACKUP_SOURCES=(
  "/var/www"
  "/etc/nginx"
  "/home/$USER/projects"
)
BACKUP_DEST="${BACKUP_DEST:-/var/backups/devops}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
LOG_FILE="${LOG_FILE:-/var/log/devops-backup.log}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# ── Logging ───────────────────────────────────────────────────────────────────
log() {
  local level="$1"; shift
  local message="$*"
  local timestamp
  timestamp=$(date "+%Y-%m-%d %H:%M:%S")
  echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

info()    { log "INFO " "${CYAN}${*}${NC}"; }
success() { log "OK   " "${GREEN}${*}${NC}"; }
warn()    { log "WARN " "${YELLOW}${*}${NC}"; }
error()   { log "ERROR" "${RED}${*}${NC}"; }

# ── Preflight checks ──────────────────────────────────────────────────────────
preflight() {
  info "Running preflight checks..."

  # Check for required tools
  for tool in tar gzip find; do
    if ! command -v "$tool" &>/dev/null; then
      error "Required tool not found: $tool"
      exit 1
    fi
  done

  # Ensure backup destination exists
  if [[ ! -d "$BACKUP_DEST" ]]; then
    mkdir -p "$BACKUP_DEST" || { error "Cannot create backup destination: $BACKUP_DEST"; exit 1; }
    info "Created backup directory: $BACKUP_DEST"
  fi

  # Check available disk space (warn if < 1GB free)
  local free_kb
  free_kb=$(df -k "$BACKUP_DEST" | awk 'NR==2 {print $4}')
  if (( free_kb < 1048576 )); then
    warn "Low disk space: $(( free_kb / 1024 ))MB free in $BACKUP_DEST"
  fi

  success "Preflight checks passed."
}

# ── Backup a single source ────────────────────────────────────────────────────
backup_source() {
  local source="$1"

  if [[ ! -e "$source" ]]; then
    warn "Source not found, skipping: $source"
    return 0
  fi

  # Build a safe filename from the path
  local safe_name
  safe_name=$(echo "$source" | tr '/' '_' | sed 's/^_//')
  local archive="${BACKUP_DEST}/${safe_name}_${TIMESTAMP}.tar.gz"

  info "Backing up: $source → $archive"

  if tar -czf "$archive" "$source" 2>>"$LOG_FILE"; then
    local size
    size=$(du -sh "$archive" | cut -f1)
    success "Backup complete: $archive (${size})"
  else
    error "Backup FAILED for: $source"
    rm -f "$archive"   # Remove partial archive
    return 1
  fi
}

# ── Rotate old backups ────────────────────────────────────────────────────────
rotate_backups() {
  info "Rotating backups older than ${RETENTION_DAYS} days..."
  local count
  count=$(find "$BACKUP_DEST" -name "*.tar.gz" -mtime +"$RETENTION_DAYS" | wc -l)

  if (( count == 0 )); then
    info "No old backups to remove."
    return 0
  fi

  find "$BACKUP_DEST" -name "*.tar.gz" -mtime +"$RETENTION_DAYS" -exec rm -f {} + 2>>"$LOG_FILE"
  success "Removed $count old backup(s)."
}

# ── Summary ───────────────────────────────────────────────────────────────────
print_summary() {
  local total
  total=$(find "$BACKUP_DEST" -name "*.tar.gz" | wc -l)
  local disk_used
  disk_used=$(du -sh "$BACKUP_DEST" 2>/dev/null | cut -f1)

  echo ""
  info "──────────────────────────────────────"
  info "  Backup Summary"
  info "  Destination : $BACKUP_DEST"
  info "  Total files : $total archive(s)"
  info "  Disk used   : $disk_used"
  info "  Retention   : $RETENTION_DAYS days"
  info "──────────────────────────────────────"
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  info "=========================================="
  info "  DevOps Backup Script — Started"
  info "  Timestamp: $TIMESTAMP"
  info "=========================================="

  preflight

  local failed=0
  for source in "${BACKUP_SOURCES[@]}"; do
    backup_source "$source" || (( failed++ )) || true
  done

  rotate_backups
  print_summary

  if (( failed > 0 )); then
    error "$failed backup(s) failed. Check the log: $LOG_FILE"
    exit 1
  fi

  success "All backups completed successfully."
}

main "$@"
