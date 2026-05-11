#!/usr/bin/env bash
# =============================================================================
# cleanup.sh — Log & Temp File Cleanup
# Project: Shell Scripting Automation | InternCareerPath DevOps Internship
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
LOG_DIRS=(
  "/var/log"
  "/tmp"
  "/var/tmp"
)
export LOG_DIRS
LOG_RETENTION_DAYS="${LOG_RETENTION_DAYS:-14}"
TEMP_RETENTION_HOURS="${TEMP_RETENTION_HOURS:-24}"
MAX_LOG_SIZE_MB="${MAX_LOG_SIZE_MB:-100}"
DRY_RUN="${DRY_RUN:-false}"
CLEANUP_LOG="/var/log/devops-cleanup.log"

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

log()     { echo -e "$(date '+%Y-%m-%d %H:%M:%S') [$1] $2" | tee -a "$CLEANUP_LOG"; }
info()    { log "INFO " "${CYAN}${*}${NC}"; }
success() { log "OK   " "${GREEN}${*}${NC}"; }
warn()    { log "WARN " "${YELLOW}${*}${NC}"; }
error()   { log "ERROR" "${RED}${*}${NC}"; }
dry()     { log "DRY  " "${BOLD}[DRY RUN] ${*}${NC}"; }

# ── Helper: safe remove ───────────────────────────────────────────────────────
safe_remove() {
  local target="$1"
  if [[ "$DRY_RUN" == "true" ]]; then
    dry "Would remove: $target"
  else
    if rm -rf "$target"; then
      success "Removed: $target"
    else
      warn "Could not remove: $target"
    fi
  fi
}

# ── Clean old log files ───────────────────────────────────────────────────────
clean_logs() {
  info "Scanning for log files older than ${LOG_RETENTION_DAYS} days..."
  local removed=0

  while IFS= read -r -d '' file; do
    safe_remove "$file"
    (( removed++ )) || true
  done < <(find /var/log -type f \( -name "*.log" -o -name "*.log.*" \) \
    -mtime +"$LOG_RETENTION_DAYS" -print0 2>/dev/null)

  info "Old log files processed: $removed"
}

# ── Truncate oversized logs ───────────────────────────────────────────────────
truncate_large_logs() {
  info "Checking for logs larger than ${MAX_LOG_SIZE_MB}MB..."
  local count=0

  while IFS= read -r -d '' file; do
    local size_mb
    size_mb=$(du -m "$file" | cut -f1)
    warn "Large log detected (${size_mb}MB): $file"
    if [[ "$DRY_RUN" == "true" ]]; then
      dry "Would truncate: $file"
    else
      # Keep last 1000 lines, truncate the rest
      tail -n 1000 "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
      success "Truncated to last 1000 lines: $file"
    fi
    (( count++ )) || true
  done < <(find /var/log -type f -name "*.log" -size +"${MAX_LOG_SIZE_MB}M" -print0 2>/dev/null)

  (( count == 0 )) && info "No oversized logs found."
}

# ── Clean temp files ──────────────────────────────────────────────────────────
clean_temp() {
  info "Cleaning temp files older than ${TEMP_RETENTION_HOURS} hours..."
  local removed=0

  while IFS= read -r -d '' file; do
    safe_remove "$file"
    (( removed++ )) || true
  done < <(find /tmp /var/tmp -type f \
    -not -name "*.sock" \
    -amin +"$(( TEMP_RETENTION_HOURS * 60 ))" \
    -print0 2>/dev/null)

  info "Temp files processed: $removed"
}

# ── Clean empty directories ───────────────────────────────────────────────────
clean_empty_dirs() {
  info "Removing empty directories in /tmp..."
  local count=0

  while IFS= read -r -d '' dir; do
    safe_remove "$dir"
    (( count++ )) || true
  done < <(find /tmp -mindepth 1 -type d -empty -print0 2>/dev/null)

  (( count == 0 )) && info "No empty directories found."
}

# ── Disk usage report ─────────────────────────────────────────────────────────
disk_report() {
  echo ""
  info "── Disk Usage Report ──────────────────"
  df -h | grep -E "^/dev|Filesystem" | while read -r line; do
    info "  $line"
  done
  info "───────────────────────────────────────"
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  [[ "$DRY_RUN" == "true" ]] && warn "DRY RUN MODE — no files will be deleted."

  info "=========================================="
  info "  DevOps Cleanup Script — Started"
  info "  Date: $(date)"
  info "=========================================="

  clean_logs
  truncate_large_logs
  clean_temp
  clean_empty_dirs
  disk_report

  success "Cleanup complete."
}

# ── Entry point ───────────────────────────────────────────────────────────────
# Usage: ./cleanup.sh [--dry-run]
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

main "$@"
