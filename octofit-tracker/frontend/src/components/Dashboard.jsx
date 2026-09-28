import { Link } from 'react-router-dom'
import { formatDate, useCollection } from '../api.js'

function Dashboard() {
  const users = useCollection('users')
  const teams = useCollection('teams')
  const activities = useCollection('activities')
  const leaderboard = useCollection('leaderboard')
  const workouts = useCollection('workouts')
  const collections = [users, teams, activities, leaderboard, workouts]
  const loading = collections.some((collection) => collection.loading)
  const error = collections.find((collection) => collection.error)?.error
  const totalPoints = teams.data.reduce((total, team) => total + Number(team.points ?? 0), 0)
  const recentActivities = [...activities.data]
    .sort((first, second) => new Date(second.date) - new Date(first.date))
    .slice(0, 4)

  const stats = [
    { label: 'Students', value: users.data.length, note: 'in the community', tone: 'mint' },
    { label: 'Team points', value: totalPoints.toLocaleString('en'), note: 'earned together', tone: 'coral' },
    { label: 'Activities', value: activities.data.length, note: 'logged so far', tone: 'yellow' },
    { label: 'Workouts', value: workouts.data.length, note: 'ready to try', tone: 'lilac' },
  ]

  return (
    <div className="dashboard-page">
      <section className="welcome-band">
        <div className="welcome-copy">
          <p className="eyebrow">YOUR SCHOOL, IN MOTION</p>
          <h1>A little movement<br />goes a long way.</h1>
          <p>See what your community has been putting in motion.</p>
          <Link className="welcome-link" to="/activities">Explore activity <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span className="art-orbit orbit-one" />
          <span className="art-orbit orbit-two" />
          <span className="art-sun" />
          <span className="art-caption">MOVE<br />TOGETHER</span>
        </div>
        <div className="welcome-index">01 <span>/ 05</span></div>
      </section>

      {error && <div className="dashboard-error" role="alert">Some tracker data is unavailable: {error}</div>}

      <section className="stats-grid" aria-label="Community stats">
        {stats.map((stat, index) => (
          <article className={`stat-card ${stat.tone}`} key={stat.label}>
            <div className="stat-top"><span>{stat.label}</span><span className="stat-index">0{index + 1}</span></div>
            <strong>{loading ? '—' : stat.value}</strong>
            <span className="stat-note">{stat.note}</span>
          </article>
        ))}
      </section>

      <div className="dashboard-lower">
        <section className="activity-panel">
          <div className="section-heading">
            <div><p className="eyebrow">FRESH FROM THE FIELD</p><h2>Recent activity</h2></div>
            <Link className="text-link" to="/activities">All activity <span aria-hidden="true">↗</span></Link>
          </div>
          {loading && <div className="inline-state">Loading the latest movement...</div>}
          {!loading && !error && recentActivities.length === 0 && <div className="inline-state">Activity will show up here once it’s logged.</div>}
          {!loading && recentActivities.length > 0 && (
            <div className="recent-list">
              {recentActivities.map((activity, index) => (
                <div className="recent-row" key={activity._id ?? activity.id ?? index}>
                  <span className={`activity-symbol activity-${activity.type ?? 'other'}`} aria-hidden="true">{activity.type === 'running' ? '↗' : activity.type === 'walking' ? '↝' : '＋'}</span>
                  <div className="recent-main"><strong>{activity.type ?? 'Activity'}</strong><span>{Number(activity.durationMinutes ?? 0)} min session</span></div>
                  <span className="recent-points">+{Number(activity.points ?? 0)} pts</span>
                  <time>{formatDate(activity.date)}</time>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="season-panel">
          <div className="season-number">{loading ? '—' : teams.data.length.toString().padStart(2, '0')}</div>
          <p className="eyebrow">BETTER AS A TEAM</p>
          <h2>Good energy is contagious.</h2>
          <p>{loading ? 'Loading teams...' : `${teams.data.length} teams are showing up for each other.`}</p>
          <Link to="/teams" className="season-link">Meet the teams <span aria-hidden="true">→</span></Link>
          <div className="season-decoration" aria-hidden="true">✳</div>
        </aside>
      </div>
      <span className="sr-only">{leaderboard.data.length} leaderboard entries loaded.</span>
    </div>
  )
}

export default Dashboard