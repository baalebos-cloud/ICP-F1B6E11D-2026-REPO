import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GitBranch, GitCommit, Play, CheckCircle, XCircle, Clock, Package, TestTube, Rocket, Shield } from 'lucide-react'
import StatusBadge from '../components/StatusBadge.jsx'

const BUILD_TIMES = [
  { run: '#81', duration: 124 },
  { run: '#82', duration: 98  },
  { run: '#83', duration: 145 },
  { run: '#84', duration: 88  },
  { run: '#85', duration: 102 },
  { run: '#86', duration: 115 },
  { run: '#87', duration: 94  },
]

const RUNS = [
  {
    id: '#91',
    commit: 'a1b2c3d',
    message: 'feat: add CI/CD pipeline config',
    branch: 'main',
    status: 'success',
    duration: '1m 42s',
    time: '2 min ago',
    stages: [
      { name: 'Lint',   status: 'success', time: '18s' },
      { name: 'Build',  status: 'success', time: '54s' },
      { name: 'Test',   status: 'success', time: '22s' },
      { name: 'Deploy', status: 'success', time: '8s'  },
    ],
  },
  {
    id: '#90',
    commit: 'e4f5g6h',
    message: 'fix: update health check thresholds',
    branch: 'main',
    status: 'success',
    duration: '1m 31s',
    time: '1 hr ago',
    stages: [
      { name: 'Lint',   status: 'success', time: '15s' },
      { name: 'Build',  status: 'success', time: '48s' },
      { name: 'Test',   status: 'success', time: '21s' },
      { name: 'Deploy', status: 'success', time: '7s'  },
    ],
  },
  {
    id: '#89',
    commit: 'i7j8k9l',
    message: 'feat: shell script automation',
    branch: 'feature/scripts',
    status: 'failed',
    duration: '0m 48s',
    time: '3 hrs ago',
    stages: [
      { name: 'Lint',   status: 'success', time: '16s' },
      { name: 'Build',  status: 'failed',  time: '32s' },
      { name: 'Test',   status: 'pending', time: '—'   },
      { name: 'Deploy', status: 'pending', time: '—'   },
    ],
  },
  {
    id: '#88',
    commit: 'm1n2o3p',
    message: 'docs: update runbook',
    branch: 'main',
    status: 'success',
    duration: '1m 38s',
    time: '5 hrs ago',
    stages: [
      { name: 'Lint',   status: 'success', time: '14s' },
      { name: 'Build',  status: 'success', time: '51s' },
      { name: 'Test',   status: 'success', time: '24s' },
      { name: 'Deploy', status: 'success', time: '9s'  },
    ],
  },
]

const STAGE_ICONS = {
  Lint:   <Shield size={14} />,
  Build:  <Package size={14} />,
  Test:   <TestTube size={14} />,
  Deploy: <Rocket size={14} />,
}

const STAGE_COLORS = {
  success: 'var(--success)',
  failed:  'var(--danger)',
  pending: 'var(--text-muted)',
  running: 'var(--accent)',
}

const TOOLTIP_STYLE = {
  backgroundColor: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 12,
  color: 'var(--text-primary)',
}

export default function Pipeline() {
  const [selected, setSelected] = useState(RUNS[0])

  const successCount = RUNS.filter(r => r.status === 'success').length
  const failCount    = RUNS.filter(r => r.status === 'failed').length

  return (
    <div className="page">
      <div className="page-header">
        <h1>CI/CD Pipeline</h1>
        <p>GitHub Actions → Vercel deployment status and history</p>
      </div>

      {/* Summary cards */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        {[
          { label: 'Total Runs',      value: RUNS.length,   color: 'var(--accent)',   icon: <Play size={16}/> },
          { label: 'Successful',      value: successCount,  color: 'var(--success)',  icon: <CheckCircle size={16}/> },
          { label: 'Failed',          value: failCount,     color: 'var(--danger)',   icon: <XCircle size={16}/> },
          { label: 'Avg Build Time',  value: '1m 36s',      color: 'var(--orange)',   icon: <Clock size={16}/> },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="metric-card">
            <div className="metric-header">
              <span className="metric-label">{label}</span>
              <div className="metric-icon" style={{ background: 'var(--bg-elevated)', color }}>
                {icon}
              </div>
            </div>
            <div className="metric-value" style={{ color }}>{value}</div>
            <div className="metric-footer" style={{ color: 'var(--text-muted)', fontSize: 12 }}>
              Last 7 days
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid" style={{ marginBottom: 24 }}>
        {/* Build time trend */}
        <div className="chart-card">
          <p className="card-title">Build Duration Trend (seconds)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={BUILD_TIMES} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="run" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} domain={[60, 160]} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}s`, 'Duration']} />
              <Line
                type="monotone"
                dataKey="duration"
                stroke="var(--accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--accent)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Selected run detail */}
        <div className="chart-card">
          <p className="card-title">Stage Breakdown — {selected.id}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            {selected.stages.map((stage, i) => (
              <div key={stage.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* connector line */}
                {i < selected.stages.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 30, top: '100%',
                    width: 1, height: 10,
                    background: 'var(--border)',
                  }} />
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--bg-elevated)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: STAGE_COLORS[stage.status],
                  flexShrink: 0,
                  border: `1px solid ${STAGE_COLORS[stage.status]}`,
                }}>
                  {STAGE_ICONS[stage.name]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{stage.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {stage.time}
                    </span>
                  </div>
                  <div style={{ marginTop: 4, height: 3, background: 'var(--bg-base)', borderRadius: 2, overflow: 'hidden' }}>
                    {stage.status === 'success' && (
                      <div style={{ height: '100%', background: STAGE_COLORS[stage.status], borderRadius: 2 }} />
                    )}
                    {stage.status === 'failed' && (
                      <div style={{ height: '100%', width: '60%', background: STAGE_COLORS[stage.status], borderRadius: 2 }} />
                    )}
                  </div>
                </div>
                <StatusBadge status={stage.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Runs */}
      <div className="table-card">
        <div className="table-card-header">
          <h3>Pipeline Runs</h3>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Click a row to inspect stages</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Run</th>
              <th>Commit</th>
              <th>Message</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {RUNS.map(run => (
              <tr
                key={run.id}
                onClick={() => setSelected(run)}
                style={{
                  cursor: 'pointer',
                  background: selected.id === run.id ? 'var(--accent-dim)' : undefined,
                }}
              >
                <td><span className="td-mono" style={{ color: 'var(--accent)' }}>{run.id}</span></td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <GitCommit size={13} style={{ color: 'var(--text-muted)' }} />
                    <span className="td-mono">{run.commit}</span>
                  </div>
                </td>
                <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>
                  {run.message}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <GitBranch size={12} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{run.branch}</span>
                  </div>
                </td>
                <td><StatusBadge status={run.status} /></td>
                <td><span className="td-mono" style={{ color: 'var(--text-secondary)' }}>{run.duration}</span></td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{run.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
