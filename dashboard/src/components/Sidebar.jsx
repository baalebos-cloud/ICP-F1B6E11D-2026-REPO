import { LayoutDashboard, GitBranch, Terminal, Settings, HelpCircle } from 'lucide-react'

const NAV = [
  { id: 'overview', label: 'Overview',      Icon: LayoutDashboard },
  { id: 'pipeline', label: 'CI/CD Pipeline', Icon: GitBranch },
  { id: 'scripts',  label: 'Shell Scripts',  Icon: Terminal },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">⚙️</div>
        <div>
          <div className="sidebar-logo-text">DevOps</div>
          <div className="sidebar-logo-sub">Dashboard</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-label">Main</span>

        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}

        <span className="nav-section-label" style={{ marginTop: 12 }}>Info</span>

        <button className="nav-item" disabled style={{ opacity: 0.5, cursor: 'default' }}>
          <Settings size={15} />
          Settings
        </button>

        <button className="nav-item" disabled style={{ opacity: 0.5, cursor: 'default' }}>
          <HelpCircle size={15} />
          Help
        </button>
      </nav>

      <div className="sidebar-footer">
        <div>InternCareerPath</div>
        <div>ICP-F1B6E11D-2026</div>
      </div>
    </aside>
  )
}
