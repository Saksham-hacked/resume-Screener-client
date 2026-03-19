import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Trash2, Eye } from 'lucide-react'
import useSessions from '../hooks/useSessions'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import EmptyState from '../components/shared/EmptyState'
import { formatDate } from '../utils/helpers'

export default function HistoryPage() {
  const navigate = useNavigate()
  const { sessions, loading, fetchSessions, removeSession } = useSessions()
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => { fetchSessions() }, [fetchSessions])

  const handleDelete = async (id) => {
    await removeSession(id)
    setConfirmDelete(null)
  }

  if (loading) return <LoadingSpinner message="Loading history..." />

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Screening History</h1>

      {sessions.length === 0 ? (
        <EmptyState
          icon={History}
          title="No screening sessions yet"
          description="Run your first screening session to see results here"
          ctaLabel="Start Screening"
          ctaPath="/screening"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((s) => {
            const strong = s.strongFit ?? 0
            const moderate = s.moderateFit ?? 0
            const notFit = s.notFit ?? 0

            return (
              <div key={s._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 leading-snug">{s.jdTitle}</h3>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(s.createdAt)}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-gray-700">{s.totalCandidates} candidates</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {strong} Strong
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                    {moderate} Moderate
                  </span>
                  <span className="flex items-center gap-1 text-xs text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    {notFit} Not Fit
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/results/${s._id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    <Eye size={13} /> View Results
                  </button>
                  {confirmDelete === s._id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2.5 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="text-xs border border-gray-200 hover:bg-gray-50 text-gray-600 px-2.5 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(s._id)}
                      className="flex items-center justify-center gap-1 text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
