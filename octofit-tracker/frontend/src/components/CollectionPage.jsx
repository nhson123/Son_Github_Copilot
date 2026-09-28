import { useState } from 'react'

function CollectionPage({ title, eyebrow, description, resource, columns, data, loading, error }) {
  const [query, setQuery] = useState('')
  const filteredData = data.filter((record) => (
    !query || JSON.stringify(record).toLowerCase().includes(query.toLowerCase())
  ))

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-count"><strong>{data.length}</strong><span>records</span></div>
      </div>

      <div className="collection-toolbar">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label={`Search ${title.toLowerCase()}`}
            className="form-control"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
            type="search"
            value={query}
          />
        </label>
        <span className="results-count">{filteredData.length} shown</span>
      </div>

      {loading && <div className="state-panel" role="status"><span className="loading-dot" />Loading {title.toLowerCase()}...</div>}
      {!loading && error && <div className="state-panel error-panel" role="alert"><strong>Couldn’t reach the tracker.</strong><span>{error}</span></div>}
      {!loading && !error && filteredData.length === 0 && (
        <div className="state-panel empty-panel">
          <span className="empty-mark">0</span>
          <strong>{data.length ? 'No matching records' : `No ${title.toLowerCase()} yet`}</strong>
          <span>{data.length ? 'Try another search.' : 'New records will appear here when they are available.'}</span>
        </div>
      )}
      {!loading && !error && filteredData.length > 0 && (
        <div className="table-frame">
          <div className="table-responsive">
            <table className="table align-middle data-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {filteredData.map((record, index) => (
                  <tr key={record._id ?? record.id ?? `${resource}-${index}`}>
                    {columns.map((column) => <td key={column.key}>{column.render(record)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}

export default CollectionPage