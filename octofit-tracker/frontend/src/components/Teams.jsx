import { useCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

function Teams() {
  const teams = useCollection('teams')

  return (
    <CollectionPage
      columns={[
        { key: 'name', label: 'Team', render: (row) => <strong>{row.name ?? 'Unnamed team'}</strong> },
        { key: 'description', label: 'About', render: (row) => row.description ?? '—' },
        { key: 'members', label: 'Members', render: (row) => row.members?.length ?? 0 },
        { key: 'points', label: 'Team points', render: (row) => <strong className="points-value">{Number(row.points ?? 0).toLocaleString('en')}</strong> },
      ]}
      data={teams.data}
      description="Progress feels better when it’s shared."
      error={teams.error}
      eyebrow="SHOW UP TOGETHER"
      loading={teams.loading}
      resource="teams"
      title="Teams"
    />
  )
}

export default Teams