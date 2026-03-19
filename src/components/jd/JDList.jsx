import JDCard from './JDCard'
import EmptyState from '../shared/EmptyState'
import LoadingSpinner from '../shared/LoadingSpinner'
import { FileText } from 'lucide-react'

export default function JDList({ jds, loading, onDelete }) {
  if (loading) return <LoadingSpinner message="Loading job descriptions..." />
  if (jds.length === 0)
    return <EmptyState icon={FileText} title="No job descriptions saved" description="Save a JD to reuse it across multiple screening sessions" />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jds.map((jd) => (
        <JDCard key={jd._id} jd={jd} onDelete={onDelete} />
      ))}
    </div>
  )
}
