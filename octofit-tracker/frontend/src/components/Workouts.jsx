import { useCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const workouts = useCollection('workouts', workoutsEndpoint)

  return (
    <CollectionPage
      columns={[
        { key: 'title', label: 'Workout', render: (row) => <strong>{row.title ?? 'Workout'}</strong> },
        { key: 'type', label: 'Focus', render: (row) => <span className={`activity-type type-${row.type ?? 'other'}`}>{row.type ?? 'General'}</span> },
        { key: 'description', label: 'Details', render: (row) => row.description ?? '—' },
        { key: 'duration', label: 'Time', render: (row) => `${row.durationMinutes ?? 0} min` },
        { key: 'difficulty', label: 'Level', render: (row) => row.difficulty ?? '—' },
        { key: 'grade', label: 'For', render: (row) => row.targetGrade ? `Grade ${row.targetGrade}` : 'Everyone' },
      ]}
      data={workouts.data}
      description="Pick a pace, find your rhythm, and make it your own."
      error={workouts.error}
      eyebrow="IDEAS FOR YOUR NEXT MOVE"
      loading={workouts.loading}
      resource="workouts"
      title="Workouts"
    />
  )
}

export default Workouts