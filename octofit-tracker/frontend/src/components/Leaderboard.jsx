import { referenceLabel, useCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const leaderboard = useCollection('leaderboard', leaderboardEndpoint)
  const users = useCollection('users')
  const teams = useCollection('teams')

  return (
    <CollectionPage
      columns={[
        { key: 'rank', label: 'Rank', render: (row) => <span className={`rank-mark${row.rank === 1 ? ' rank-first' : ''}`}>{String(row.rank ?? '—').padStart(2, '0')}</span> },
        { key: 'user', label: 'Student', render: (row) => referenceLabel(row.user, users.data, (user) => [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username) },
        { key: 'team', label: 'Team', render: (row) => referenceLabel(row.team, teams.data, (team) => team.name) },
        { key: 'period', label: 'Period', render: (row) => row.period ?? '—' },
        { key: 'points', label: 'Points', render: (row) => <strong className="points-value">{row.points ?? 0}</strong> },
      ]}
      data={leaderboard.data}
      description="Celebrate the effort, consistency, and points earned this period."
      error={leaderboard.error || users.error || teams.error}
      eyebrow="FRIENDLY COMPETITION"
      loading={leaderboard.loading || users.loading || teams.loading}
      resource="leaderboard"
      title="Leaderboard"
    />
  )
}

export default Leaderboard