import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Download, RefreshCw } from 'lucide-react'
import useSessions from '../hooks/useSessions'
import ResultsTable from '../components/results/ResultsTable'
import CandidateDrawer from '../components/results/CandidateDrawer'
import CompareView from '../components/results/CompareView'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { exportToCSV, formatDate } from '../utils/helpers'

export default function ResultsPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const { session, candidates, loading, fetchSession } = useSessions()
  const [drawerCandidate, setDrawerCandidate] = useState(null)
  const [compareList, setCompareList] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  useEffect(() => { fetchSession(sessionId) }, [sessionId, fetchSession])

  const addToCompare = (candidate) => {
    setCompareList((prev) => {
      if (prev.find((c) => c.rank === candidate.rank)) return prev
      if (prev.length >= 3) return prev
      return [...prev, candidate]
    })
    setShowCompare(true)
  }

  const removeFromCompare = (rank) => {
    setCompareList((prev) => prev.filter((c) => c.rank !== rank))
  }

  if (loading) return <LoadingSpinner message="Loading results..." />
  if (!session) return null

  const strongFit = candidates.filter((c) => c.recommendation === 'Strong Fit').length
  const moderateFit = candidates.filter((c) => c.recommendation === 'Moderate Fit').length
  const notFit = candidates.filter((c) => c.recommendation === 'Not Fit').length

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{session.jdTitle}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{formatDate(session.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{session.totalCandidates} Screened</span>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{strongFit} Strong Fit</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">{moderateFit} Moderate Fit</span>
            <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">{notFit} Not Fit</span>
            <button
              onClick={() => exportToCSV(candidates, session.jdTitle)}
              className="flex items-center gap-1.5 text-xs border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors duration-200"
            >
              <Download size={13} /> Export CSV
            </button>
            <button
              onClick={() => navigate('/screening')}
              className="flex items-center gap-1.5 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors duration-200"
            >
              <RefreshCw size={13} /> Screen Again
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <ResultsTable
        candidates={candidates}
        onViewDetails={setDrawerCandidate}
        onAddCompare={addToCompare}
      />

      {/* Drawer */}
      {drawerCandidate && (
        <CandidateDrawer
          candidate={drawerCandidate}
          onClose={() => setDrawerCandidate(null)}
          onAddCompare={addToCompare}
        />
      )}

      {/* Compare View */}
      {showCompare && compareList.length > 0 && (
        <CompareView
          candidates={compareList}
          onClose={() => setShowCompare(false)}
          onRemove={removeFromCompare}
        />
      )}

      {/* Compare FAB */}
      {compareList.length > 0 && !showCompare && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setShowCompare(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl shadow-md font-medium text-sm transition-colors duration-200"
          >
            Compare ({compareList.length})
          </button>
        </div>
      )}
    </div>
  )
}
