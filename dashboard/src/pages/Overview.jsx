import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Cpu, MemoryStick, HardDrive, Clock, CheckCircle, XCircle, GitCommit } from 'lucide-react'
import MetricCard from '../components/MetricCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

// ── Mock Data ─────────────────────────────────────────────────────────────────
const generateTimeSeries = () =>
  Array.from({ length: 12 }, (_, i) => ({
    time: `${String(i * 2).padStart(2, '0')}:00`,
    cpu:     Math.round(25 + Math.random() * 50),
    memory:  Math.round(40 + Math.random() * 35),
    network: Math.round(10 + Math.random() * 80),
  }))

const PIPELINE_STATS = [
  { day: 'Mon', passed: 12, failed: 1 },
  { day: 'Tue', passed: 15, failed: 0 },
  { day: 'Wed', passed: 9,  failed: 2 },
  { day: 'Thu', passed: 18, failed: 1 },
  { day: 'Fri', passed: 21, failed: 0 },
  { day: 'Sat', passed: 6,  failed: 0 },
  { day: 'Sun', passed: 4,  failed: 0 },
]

const DEPLOYMENTS = [
  { id: 'dep-001', commit: 'a1b2c3d', message: 'feat: add CI/CD pipeline config',    branch: 'main',    status: 'success', env: 'Production', time: '2 min ago',  author: 'You' },
  { id: 'dep-002', commit: 'e4f5g6h', message: 'fix: update health-check thresholds', branch: 'main',    status: 'success', env: 'Production', time: '1 hr ago',   author: 'You' },
  { id: 'dep-003', commit: 'i7j8k9l', message: 'chore: add cleanup cron job',         branch: 'staging', status: 'success', env: 'Staging',    time: '3 hrs ago',  author: 'You' },
  { id: 'dep-004', commit: 'm1n2o3p', message: 'refactor: improve backup rotation',   branch: 'staging', status: 'failed',  env: 'Staging',    time: '5 hrs ago',  author: 'You' },
  { id: 'dep-005', commit: 'q4r5s6t', message: 'docs: update runbook',                branch: 'main',    status: 'success', env: 'Production', time: '1 day ago',  author: 'You' },
]

const CUSTOM_TOOLTIP_STYLE = {
  backgroundColor: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 12,
  color: 'var(--text-primary)',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Overview() {
  const [series, setSeries] = useState(generateTimeSeries)
  const [metrics, setMetrics] = useState({ cpu: 42, memory: 61, disk: 34, uptime: 99.97 })

  // Simulate live metric updates
  useEffect(() => {
    const id = setInterval(() => {
      setSeries(generateTimeSeries())
      setMetrics({
        cpu:    Math.round(25 + Math.random() * 50),
        memory: Math.round(40 + Math.random() * 35),
        disk:   Math.round(28 + Math.random() * 20),
        uptime: +(99.9 + Math.random() * 0.09).toFixed(2),
      })
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>System Overview</h1>
        <p>Real-time metrics and deployment activity</p>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <MetricCard
          label="CPU Usage"
          value={metrics.cpu}
          unit="%"
          icon={<Cpu size={16} />}
          color="var(--accent)"
          bgColor="var(--accent-dim)"
          progress={metrics.cpu}
          trend={metrics.cpu > 60 ? 'up' : 'down'}
          trendLabel={`${metrics.cpu > 60 ? '+' : ''}${metrics.cpu - 42}% from avg`}
        />
        <MetricCard
          label="Memory Usage"
          value={metrics.memory}
          unit="%"
          icon={<MemoryStick size={16} />}
          color="var(--purple)"
          bgColor="#2d1f5e"
          progress={metrics.memory}
          trend="neutral"
          trendLabel={`${(metrics.memory / 100 * 16).toFixed(1)}GB / 16GB`}
        />
        <MetricCard
          label="Disk Usage"
          value={metrics.disk}
          unit="%"
          icon={<HardDrive size={16} />}
          color="var(--orange)"
          bgColor="#2d1f00"
          progress={metrics.disk}
          trend="down"
          trendLabel="Cleaned 2.3GB today"
        />
        <MetricCard
          label="Uptime"
          value={metrics.uptime}
          unit="%"
          icon={<Clock size={16} />}
          color="var(--success)"
          bgColor="var(--success-dim)"
          trend="up"
          trendLabel="30-day rolling average"
        />
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <p className="card-title">Resource Usage — Last 24h</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#58a6ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#58a6ff" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="gMem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a371f7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a371f7" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              <Area type="monotone" dataKey="cpu"    stroke="#58a6ff" fill="url(#gCpu)" strokeWidth={2} name="CPU %" />
              <Area type="monotone" dataKey="memory" stroke="#a371f7" fill="url(#gMem)" strokeWidth={2} name="Memory %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <p className="card-title">Pipeline Runs — This Week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={PIPELINE_STATS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
              <Bar dataKey="passed" fill="var(--success)" name="Passed" radius={[3, 3, 0, 0]} />
              <Bar dataKey="failed" fill="var(--danger)"  name="Failed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deployments Table */}
      <div className="table-card">
        <div className="table-card-header">
          <h3>Recent Deployments</h3>
          <StatusBadge status="healthy" label="Vercel Connected" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Commit</th>
              <th>Message</th>
              <th>Branch</th>
              <th>Environment</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {DEPLOYMENTS.map(dep => (
              <tr key={dep.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <GitCommit size={13} style={{ color: 'var(--text-muted)' }} />
                    <span className="td-mono">{dep.commit}</span>
                  </div>
                </td>
                <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {dep.message}
                </td>
                <td><span className="badge badge-neutral">{dep.branch}</span></td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{dep.env}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {dep.status === 'success'
                      ? <CheckCircle size={13} style={{ color: 'var(--success)' }} />
                      : <XCircle    size={13} style={{ color: 'var(--danger)' }} />
                    }
                    <StatusBadge status={dep.status} />
                  </div>
                </td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{dep.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
