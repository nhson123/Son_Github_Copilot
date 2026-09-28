import { useCollection } from '../api.js'
import CollectionPage from './CollectionPage.jsx'

function Users() {
  const users = useCollection('users')

  return (
    <CollectionPage
      columns={[
        { key: 'name', label: 'Student', render: (row) => <strong>{[row.firstName, row.lastName].filter(Boolean).join(' ') || row.username || 'Student'}</strong> },
        { key: 'username', label: 'Username', render: (row) => row.username ? `@${row.username}` : '—' },
        { key: 'grade', label: 'Grade', render: (row) => row.grade ? `Grade ${row.grade}` : '—' },
        { key: 'email', label: 'Email', render: (row) => row.email ?? '—' },
      ]}
      data={users.data}
      description="Meet the people building stronger habits across campus."
      error={users.error}
      eyebrow="THE OCTOFIT COMMUNITY"
      loading={users.loading}
      resource="users"
      title="People"
    />
  )
}

export default Users