#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Pull → Build → Restart Deployment Script
# Project: Shell Scripting Automation | InternCareerPath DevOps Internship
# =============================================================================

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
APP_DIR="${APP_DIR:-/var/www/app}"
BRANCH="${BRANCH:-main}"
SERVICE_NAME="${SERVICE_NAME:-myapp}"
BUILD_CMD="${BUILD_CMD:-npm run build}"
INSTALL_CMD="${INSTALL_CMD:-npm ci --production}"
DEPLOY_LOG="/var/log/devops-deploy.log"
MAX_ROLLBACK_RELEASES=5
RELEASES_DIR="${APP_DIR}/.releases"

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RELEASE_DIR="${RELEASES_DIR}/${TIMESTAMP}"

log()     { echo -e "$(date '+%Y-%m-%d %H:%M:%S') [$1] $2" | tee -a "$DEPLOY_LOG"; }
info()    { log "INFO " "${CYAN}${*}${NC}"; }
success() { log "OK   " "${GREEN}${*}${NC}"; }
warn()    { log "WARN " "${YELLOW}${*}${NC}"; }
error()   { log "ERROR" "${RED}${*}${NC}"; }
step()    { echo -e "\n${BOLD}▶ ${*}${NC}"; log "STEP " "${*}"; }

# ── Trap: rollback on failure ─────────────────────────────────────────────────
trap 'on_error' ERR

on_error() {
  error "Deployment failed! Initiating rollback..."
  rollback
  exit 1
}

# ── Git: pull latest ──────────────────────────────────────────────────────────
pull_latest() {
  step "Pulling latest code from origin/$BRANCH"

  if [[ ! -d "$APP_DIR/.git" ]]; then
    error "Not a git repository: $APP_DIR"
    exit 1
  fi

  cd "$APP_DIR"
  git fetch origin "$BRANCH"

  local current_sha new_sha
  current_sha=$(git rev-parse HEAD)
  new_sha=$(git rev-parse "origin/$BRANCH")

  if [[ "$current_sha" == "$new_sha" ]]; then
    warn "Already up to date. No new commits."
    exit 0
  fi

  info "Updating: ${current_sha:0:7} → ${new_sha:0:7}"
  git pull origin "$BRANCH"
  success "Code updated to $(git rev-parse --short HEAD)"
}

# ── Create release snapshot ───────────────────────────────────────────────────
create_release() {
  step "Creating release snapshot: $TIMESTAMP"
  mkdir -p "$RELEASES_DIR"
  cp -r "$APP_DIR" "$RELEASE_DIR"
  success "Release saved: $RELEASE_DIR"
}

# ── Install dependencies ──────────────────────────────────────────────────────
install_deps() {
  step "Installing dependencies"
  cd "$APP_DIR"

  if [[ -f "package.json" ]]; then
    info "Running: $INSTALL_CMD"
    eval "$INSTALL_CMD"
    success "Dependencies installed."
  else
    info "No package.json found, skipping."
  fi
}

# ── Build ─────────────────────────────────────────────────────────────────────
build_app() {
  step "Building application"
  cd "$APP_DIR"
  info "Running: $BUILD_CMD"
  eval "$BUILD_CMD"
  success "Build complete."
}

# ── Restart service ───────────────────────────────────────────────────────────
restart_service() {
  step "Restarting service: $SERVICE_NAME"

  if command -v systemctl &>/dev/null && systemctl is-enabled "$SERVICE_NAME" &>/dev/null; then
    systemctl restart "$SERVICE_NAME"
    success "Systemd service restarted: $SERVICE_NAME"
  elif command -v pm2 &>/dev/null && pm2 list | grep -q "$SERVICE_NAME"; then
    pm2 restart "$SERVICE_NAME"
    success "PM2 process restarted: $SERVICE_NAME"
  else
    warn "Service manager not found. Restart manually: $SERVICE_NAME"
  fi
}

# ── Rollback ──────────────────────────────────────────────────────────────────
rollback() {
  step "Rolling back to previous release"

  local previous
  previous=$(ls -t "$RELEASES_DIR" 2>/dev/null | sed -n '2p')

  if [[ -z "$previous" ]]; then
    error "No previous release to roll back to."
    return 1
  fi

  warn "Rolling back to: $previous"
  rsync -a --delete "${RELEASES_DIR}/${previous}/" "$APP_DIR/"
  restart_service
  success "Rollback complete: $previous"
}

# ── Clean old releases ────────────────────────────────────────────────────────
clean_old_releases() {
  step "Pruning old releases (keeping last $MAX_ROLLBACK_RELEASES)"
  local count
  count=$(ls -1 "$RELEASES_DIR" 2>/dev/null | wc -l)

  if (( count > MAX_ROLLBACK_RELEASES )); then
    ls -t "$RELEASES_DIR" | tail -n +"$(( MAX_ROLLBACK_RELEASES + 1 ))" | \
      xargs -I{} rm -rf "${RELEASES_DIR}/{}"
    success "Cleaned old releases."
  else
    info "No old releases to clean ($count / $MAX_ROLLBACK_RELEASES)."
  fi
}

# ── Summary ───────────────────────────────────────────────────────────────────
deploy_summary() {
  echo ""
  info "────────────────────────────────────────"
  info "  Deployment Summary"
  info "  App Dir   : $APP_DIR"
  info "  Branch    : $BRANCH"
  info "  Release   : $TIMESTAMP"
  info "  Commit    : $(cd "$APP_DIR" && git rev-parse --short HEAD)"
  info "  Service   : $SERVICE_NAME"
  info "────────────────────────────────────────"
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
  info "=========================================="
  info "  DevOps Deploy Script — Started"
  info "  Timestamp: $TIMESTAMP"
  info "=========================================="

  pull_latest
  create_release
  install_deps
  build_app
  restart_service
  clean_old_releases
  deploy_summary

  success "🚀 Deployment successful!"
}

# ── Subcommand: rollback ───────────────────────────────────────────────────────
# Usage: ./deploy.sh [rollback]
if [[ "${1:-}" == "rollback" ]]; then
  trap - ERR
  rollback
else
  main "$@"
fi
