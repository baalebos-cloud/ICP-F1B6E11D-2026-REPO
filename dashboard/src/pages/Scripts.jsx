import { CheckCircle } from 'lucide-react'
import StatusBadge from '../components/StatusBadge.jsx'

const SCRIPTS = [
  {
    name: 'backup.sh',
    week: 'Week 2',
    status: 'success',
    description: 'Compresses and archives configured directories with timestamps. Automatically rotates old backups past the retention window.',
    features: [
      'Configurable source directories and destination',
      'tar + gzip compression with timestamps',
      'Automatic rotation (default: 7-day retention)',
      'Pre-flight disk space check',
      'Structured timestamped logging',
    ],
    usage: `BACKUP_DEST=/var/backups ./backup.sh`,
    schedule: '0 2 * * *',
    scheduleDesc: 'Daily at 2:00 AM',
  },
  {
    name: 'cleanup.sh',
    week: 'Week 2',
    status: 'success',
    description: 'Removes stale log files, truncates oversized logs to last 1000 lines, and cleans temp directories. Supports --dry-run mode.',
    features: [
      'Removes logs older than retention threshold',
      'Truncates logs larger than size limit',
      'Cleans /tmp and /var/tmp',
      '--dry-run flag for safe preview',
      'Disk usage report at completion',
    ],
    usage: `./cleanup.sh --dry-run`,
    schedule: '30 3 * * 0',
    scheduleDesc: 'Sundays at 3:30 AM',
  },
  {
    name: 'deploy.sh',
    week: 'Week 3',
    status: 'success',
    description: 'Full deployment automation: git pull → dependency install → build → service restart. Snapshots releases and auto-rolls back on failure.',
    features: [
      'Git pull with change detection',
      'Release snapshots for rollback support',
      'Works with systemd and PM2',
      'Automatic rollback via ERR trap',
      'Configurable build and install commands',
    ],
    usage: `APP_DIR=/var/www/app ./deploy.sh\n./deploy.sh rollback`,
    schedule: '0 1 * * 1-5',
    scheduleDesc: 'Weekdays at 1:00 AM (optional)',
  },
  {
    name: 'health-check.sh',
    week: 'Week 3',
    status: 'success',
    description: 'Monitors systemd services, HTTP endpoints, disk, memory, and CPU. Returns exit codes for alerting. Supports email notifications.',
    features: [
      'Systemd service status checks',
      'HTTP endpoint probing with curl',
      'Disk, memory, and CPU thresholds',
      'Email alerting via ALERT_EMAIL env var',
      'Exit codes: 0=ok, 1=warn, 2=critical',
    ],
    usage: `ALERT_EMAIL=admin@example.com ./health-check.sh`,
    schedule: '*/5 * * * *',
    scheduleDesc: 'Every 5 minutes',
  },
]

const CRON_TABLE = [
  { script: 'backup.sh',       schedule: '0 2 * * *',    desc: 'Daily at 2:00 AM',      status: 'success' },
  { script: 'cleanup.sh',      schedule: '30 3 * * 0',   desc: 'Sundays at 3:30 AM',    status: 'success' },
  { script: 'health-check.sh', schedule: '*/5 * * * *',  desc: 'Every 5 minutes',       status: 'success' },
  { script: 'deploy.sh',       schedule: '0 1 * * 1-5',  desc: 'Weekdays 1:00 AM',      status: 'warning' },
]

export default function Scripts() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Shell Scripts</h1>
        <p>Project 1: Bash automation — backup, cleanup, deployment, health monitoring</p>
      </div>

      <div className="scripts-grid">
        {SCRIPTS.map(script => (
          <div key={script.name} className="script-card">
            <div className="script-card-header">
              <div>
                <div className="script-name">{script.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{script.week}</div>
              </div>
              <StatusBadge status={script.status} label="Tested" />
            </div>

            <div className="script-body">
              <p className="script-desc">{script.description}</p>

              <div className="script-features">
                {script.features.map(f => (
                  <div key={f} className="script-feature">
                    <CheckCircle size={13} className="feature-check" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="code-block">
                <div className="code-comment"># Usage</div>
                {script.usage.split('\n').map((line, i) => (
                  <div key={i}>
                    <span className="code-cmd">$ </span>
                    {line.includes('--') ? (
                      <>
                        {line.split('--')[0]}
                        <span className="code-flag">--{line.split('--')[1]}</span>
                      </>
                    ) : line}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 12, padding: '8px 12px',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Cron schedule</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <code style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--orange)',
                  }}>{script.schedule}</code>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{script.scheduleDesc}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cron schedule table */}
      <div className="table-card">
        <div className="table-card-header">
          <h3>Cron Schedule</h3>
          <StatusBadge status="success" label="4 jobs configured" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Script</th>
              <th>Cron Expression</th>
              <th>Description</th>
              <th>Status</th>
              <th>Log File</th>
            </tr>
          </thead>
          <tbody>
            {CRON_TABLE.map(row => (
              <tr key={row.script}>
                <td><span className="td-mono" style={{ color: 'var(--accent)' }}>{row.script}</span></td>
                <td><code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--orange)' }}>{row.schedule}</code></td>
                <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.desc}</td>
                <td>
                  <StatusBadge
                    status={row.status}
                    label={row.status === 'warning' ? 'Optional' : 'Active'}
                  />
                </td>
                <td>
                  <span className="td-mono" style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    /var/log/devops-{row.script.replace('.sh', '')}.log
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
