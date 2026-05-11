import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Overview from './pages/Overview.jsx'
import Pipeline from './pages/Pipeline.jsx'
import Scripts from './pages/Scripts.jsx'

export default function App() {
  const [page, setPage] = useState('overview')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const pages = { overview: Overview, pipeline: Pipeline, scripts: Scripts }
  const PageComponent = pages[page]

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })

  const pageTitles = {
    overview: 'Overview',
    pipeline: 'CI/CD Pipeline',
    scripts: 'Shell Scripts',
  }

  return (
    <div className="app">
      <Sidebar activePage={page} onNavigate={setPage} />

      <div className="main">
        <header className="topbar">
          <span className="topbar-title">{pageTitles[page]}</span>
          <div className="topbar-right">
            <div className="status-pill">
              <span className="status-dot" />
              All Systems Operational
            </div>
            <span className="topbar-time">{dateStr} · {timeStr}</span>
          </div>
        </header>

        <PageComponent />
      </div>
    </div>
  )
}
