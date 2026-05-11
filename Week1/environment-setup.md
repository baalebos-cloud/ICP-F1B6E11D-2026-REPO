# Environment Setup

## System Requirements
- OS: Ubuntu 22.04+ / macOS / WSL2 on Windows
- Git 2.x+
- Node.js 20+ (for dashboard)
- Bash 5+

## 1. Git Configuration

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "nano"
git config --global init.defaultBranch main
```

## 2. SSH Key for GitHub

```bash
ssh-keygen -t ed25519 -C "your@email.com"
cat ~/.ssh/id_ed25519.pub
# Paste this into GitHub → Settings → SSH Keys
```

## 3. Node.js via NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v   # v20.x.x
```

## 4. Clone Repository

```bash
git clone git@github.com:baalebos-cloud/ICP-F1B6E11D-2026-REPO.git
cd ICP-F1B6E11D-2026-REPO
```

## 5. Vercel CLI

```bash
npm install -g vercel
vercel login
```

## 6. GitHub Secrets Required

Add these in your repo → Settings → Secrets → Actions:

| Secret Name | Where to get it |
|-------------|-----------------|
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

### How to get Vercel IDs:
```bash
cd dashboard
vercel link   # Follow prompts, links project to Vercel
cat .vercel/project.json
# { "orgId": "xxx", "projectId": "yyy" }
```
