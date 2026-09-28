import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`

export async function fetchCollection(resource, signal, endpoint = `${API_BASE_URL}/${resource}/`) {
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error(`Could not load ${resource} (${response.status})`)
  }

  const payload = await response.json()
  const candidates = [
    payload,
    payload?.results,
    payload?.data,
    payload?.data?.results,
    payload?.items,
    payload?.[resource],
  ]
  return candidates.find(Array.isArray) ?? []
}

export function useCollection(resource, endpoint) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, controller.signal, endpoint)
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ data: [], loading: false, error: error.message })
        }
      })

    return () => controller.abort()
  }, [resource, endpoint])

  return state
}

export function referenceLabel(reference, records, labelForRecord) {
  const referenceId = typeof reference === 'object' && reference !== null
    ? String(reference._id ?? reference.id ?? '')
    : String(reference ?? '')

  if (typeof reference === 'object' && reference !== null) {
    const embeddedLabel = labelForRecord(reference)
    if (embeddedLabel) return embeddedLabel
  }

  const record = records.find((entry) => String(entry._id ?? entry.id ?? '') === referenceId)
  if (record) return labelForRecord(record)
  return referenceId ? `#${referenceId.slice(-6)}` : '—'
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}