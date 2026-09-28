import { formatDate, referenceLabel, useCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const activities = useCollection('activities', activitiesEndpoint)
  const users = useCollection('users')
  const teams = useCollection('teams')

  return (
    <CollectionPage
      columns={[
        { key: 'type', label: 'Activity', render: (row) => <span className={`activity-type type-${row.type ?? 'other'}`}>{row.type ?? 'Activity'}</span> },
        { key: 'user', label: 'Student', render: (row) => referenceLabel(row.user, users.data, (user) => [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username) },
        { key: 'team', label: 'Team', render: (row) => referenceLabel(row.team, teams.data, (team) => team.name) },
        { key: 'date', label: 'Date', render: (row) => formatDate(row.date) },
        { key: 'duration', label: 'Duration', render: (row) => `${row.durationMinutes ?? 0} min` },
        { key: 'distance', label: 'Distance', render: (row) => row.distanceKm == null ? '—' : `${row.distanceKm} km` },
        { key: 'points', label: 'Points', render: (row) => <strong className="points-value">+{row.points ?? 0}</strong> },
      ]}
      data={activities.data}
      description="Every run, walk, and strength session adds up."
      error={activities.error || users.error || teams.error}
      eyebrow="THE MOVEMENT LOG"
      loading={activities.loading || users.loading || teams.loading}
      resource="activities"
      title="Activities"
    />
  )
}

export default Activities