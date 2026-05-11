import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function MetricCard({ label, value, unit = '', icon, color, bgColor, progress, trend, trendLabel }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendClass = trend === 'up' ? 'metric-trend-up' : trend === 'down' ? 'metric-trend-down' : ''

  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        <div className="metric-icon" style={{ background: bgColor, color }}>
          {icon}
        </div>
      </div>

      <div className="metric-value" style={{ color }}>
        {value}<span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{unit}</span>
      </div>

      {progress !== undefined && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: progress > 85 ? 'var(--danger)' : progress > 65 ? 'var(--warning)' : color,
            }}
          />
        </div>
      )}

      <div className="metric-footer">
        <TrendIcon size={12} className={trendClass} />
        <span className={trendClass}>{trendLabel}</span>
      </div>
    </div>
  )
}
