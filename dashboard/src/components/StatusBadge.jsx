const VARIANTS = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger:  'badge-danger',
  info:    'badge-info',
  neutral: 'badge-neutral',
}

export default function StatusBadge({ status, label }) {
  const statusMap = {
    success:  { variant: 'success', dot: '●', text: label || 'Success' },
    passed:   { variant: 'success', dot: '●', text: label || 'Passed'  },
    running:  { variant: 'info',    dot: '◉', text: label || 'Running' },
    pending:  { variant: 'neutral', dot: '○', text: label || 'Pending' },
    failed:   { variant: 'danger',  dot: '●', text: label || 'Failed'  },
    warning:  { variant: 'warning', dot: '●', text: label || 'Warning' },
    healthy:  { variant: 'success', dot: '●', text: label || 'Healthy' },
    degraded: { variant: 'warning', dot: '●', text: label || 'Degraded'},
  }

  const cfg = statusMap[status] || { variant: 'neutral', dot: '●', text: label || status }

  return (
    <span className={`badge ${VARIANTS[cfg.variant]}`}>
      <span>{cfg.dot}</span>
      {cfg.text}
    </span>
  )
}
