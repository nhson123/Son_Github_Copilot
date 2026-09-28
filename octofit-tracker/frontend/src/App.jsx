import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Dashboard from './components/Dashboard.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/', icon: '01' },
  { label: 'Activities', path: '/activities', icon: '02' },
  { label: 'Teams', path: '/teams', icon: '03' },
  { label: 'Leaderboard', path: '/leaderboard', icon: '04' },
  { label: 'People', path: '/users', icon: '05' },
  { label: 'Workouts', path: '/workouts', icon: '06' },
]

const pageTitles = Object.fromEntries(navigation.map(({ label, path }) => [path, label]))

function App() {
  const location = useLocation()
  const currentPage = pageTitles[location.pathname] ?? 'Overview'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="OctoFit overview">
          <img src={logo} alt="" />
          <span>octofit<span className="brand-period">.</span></span>
        </Link>

        <div className="sidebar-label">Workspace</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ label, path, icon }) => (
            <NavLink
              end={path === '/'}
              key={path}
              to={path}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-index">{icon}</span>
              <span>{label}</span>
              {path === '/leaderboard' && <span className="nav-spark">+</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span className="season-dot" />
          <div>
            <strong>Mergington High</strong>
            <span>Movement matters</span>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>OctoFit</span><b>/</b>{currentPage}</div>
          <div className="topbar-right">
            <span className="live-indicator"><i /> Live tracker</span>
            <div className="profile-mark" aria-label="OctoFit profile">O</div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<section className="not-found"><p className="eyebrow">404 / NOT FOUND</p><h1>This route wandered off.</h1><Link className="text-link" to="/">Back to overview</Link></section>} />
          </Routes>
        </main>

        <footer className="app-footer">
          <span>OCTOFIT TRACKER</span>
          <span>Small steps. Strong habits.</span>
        </footer>
      </div>
    </div>
  )
}

export default App
