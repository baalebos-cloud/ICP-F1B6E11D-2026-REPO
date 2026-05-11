#!/usr/bin/env bash
# =============================================================================
# health-check.sh — Service & Resource Health Monitor
# Project: Shell Scripting Automation | InternCareerPath DevOps Internship
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
SERVICES=("nginx" "ssh")           # Systemd services to check
HTTP_ENDPOINTS=(                    # HTTP endpoints to probe
  "http://localhost:3000"
  "http://localhost:80"
)
DISK_WARN_PERCENT=80                # Warn if disk usage exceeds this
MEM_WARN_PERCENT=85                 # Warn if memory usage exceeds this
HEALTH_LOG="/var/log/devops-health.log"
ALERT_EMAIL="${ALERT_EMAIL:-}"      # Set to send email alerts

# ── State tracking ────────────────────────────────────────────────────────────
ISSUES=0
WARNINGS=0

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

log()     { echo -e "$(date '+%Y-%m-%d %H:%M:%S') [$1] $2" | tee -a "$HEALTH_LOG"; }
ok()      { log "  OK " "${GREEN}✓ ${*}${NC}"; }
fail()    { log " FAIL" "${RED}✗ ${*}${NC}"; (( ISSUES++ )) || true; }
warn()    { log " WARN" "${YELLOW}⚠ ${*}${NC}"; (( WARNINGS++ )) || true; }
info()    { log " INFO" "${CYAN}${*}${NC}"; }
section() { echo -e "\n${BOLD}── ${*} ─────────────────────────────────${NC}"; }

# ── Check systemd services ────────────────────────────────────────────────────
check_services() {
  section "Services"
  for service in "${SERVICES[@]}"; do
    if systemctl is-active --quiet "$service" 2>/dev/null; then
      ok "Service running: $service"
    else
      fail "Service NOT running: $service"
    fi
  done
}

# ── Check HTTP endpoints ──────────────────────────────────────────────────────
check_http() {
  section "HTTP Endpoints"
  if ! command -v curl &>/dev/null; then
    warn "curl not installed, skipping HTTP checks."
    return
  fi

  for url in "${HTTP_ENDPOINTS[@]}"; do
    local http_code
    http_code=$(curl -o /dev/null -s -w "%{http_code}" --connect-timeout 5 "$url" 2>/dev/null || echo "000")

    if [[ "$http_code" == 2* ]] || [[ "$http_code" == 3* ]]; then
      ok "Endpoint OK ($http_code): $url"
    elif [[ "$http_code" == "000" ]]; then
      fail "Endpoint UNREACHABLE: $url"
    else
      warn "Endpoint returned $http_code: $url"
    fi
  done
}

# ── Check disk usage ──────────────────────────────────────────────────────────
check_disk() {
  section "Disk Usage"
  while IFS= read -r line; do
    local use_pct mount
    use_pct=$(echo "$line" | awk '{print $5}' | tr -d '%')
    mount=$(echo "$line" | awk '{print $6}')

    if (( use_pct >= DISK_WARN_PERCENT )); then
      if (( use_pct >= 95 )); then
        fail "Disk CRITICAL (${use_pct}%): $mount"
      else
        warn "Disk HIGH (${use_pct}%): $mount"
      fi
    else
      ok "Disk OK (${use_pct}%): $mount"
    fi
  done < <(df -h | awk 'NR>1 && /^\/dev/ {print}')
}

# ── Check memory usage ────────────────────────────────────────────────────────
check_memory() {
  section "Memory"
  local total used free use_pct
  total=$(free -m | awk '/^Mem:/ {print $2}')
  used=$(free -m | awk '/^Mem:/ {print $3}')
  free=$(free -m | awk '/^Mem:/ {print $4}')
  use_pct=$(( used * 100 / total ))

  info "Total: ${total}MB | Used: ${used}MB | Free: ${free}MB | Usage: ${use_pct}%"

  if (( use_pct >= MEM_WARN_PERCENT )); then
    warn "Memory usage HIGH: ${use_pct}%"
  else
    ok "Memory OK: ${use_pct}%"
  fi

  # Swap check
  local swap_total swap_used
  swap_total=$(free -m | awk '/^Swap:/ {print $2}')
  swap_used=$(free -m  | awk '/^Swap:/ {print $3}')
  if (( swap_total > 0 )); then
    info "Swap: ${swap_used}MB / ${swap_total}MB"
    (( swap_used > swap_total / 2 )) && warn "High swap usage detected."
  fi
}

# ── Check CPU load ────────────────────────────────────────────────────────────
check_cpu() {
  section "CPU Load"
  local cores load1 load5 load15
  cores=$(nproc)
  read -r load1 load5 load15 _ < /proc/loadavg

  info "Load average (1m/5m/15m): $load1 / $load5 / $load15 | Cores: $cores"

  local load_int
  load_int=$(echo "$load1" | awk -F. '{print $1}')
  if (( load_int >= cores )); then
    warn "CPU load is HIGH: $load1 (≥ $cores cores)"
  else
    ok "CPU load OK: $load1"
  fi
}

# ── Alert ─────────────────────────────────────────────────────────────────────
send_alert() {
  if [[ -n "$ALERT_EMAIL" ]] && (( ISSUES > 0 )); then
    echo "Health check found $ISSUES issue(s). See log: $HEALTH_LOG" | \
      mail -s "[ALERT] DevOps Health Check Failed — $(hostname)" "$ALERT_EMAIL" 2>/dev/null || \
      warn "Could not send alert email."
  fi
}

# ── Final Report ──────────────────────────────────────────────────────────────
final_report() {
  echo ""
  info "────────────────────────────────────────"
  info "  Health Check Summary — $(date)"
  info "  Host     : $(hostname)"
  info "  Issues   : $ISSUES"
  info "  Warnings : $WARNINGS"
  info "────────────────────────────────────────"

  if (( ISSUES > 0 )); then
    fail "Health check FAILED with $ISSUES critical issue(s)."
    send_alert
    exit 2
  elif (( WARNINGS > 0 )); then
    warn "Health check passed with $WARNINGS warning(s)."
    exit 1
  else
    ok "All systems healthy."
    exit 0
  fi
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  info "=========================================="
  info "  DevOps Health Check — $(date)"
  info "=========================================="

  check_services
  check_http
  check_disk
  check_memory
  check_cpu
  final_report
}

main "$@"
