import { X, CheckCircle, XCircle, Mail } from 'lucide-react'
import ScoreBar from './ScoreBar'
import RecommendationBadge from './RecommendationBadge'
import { getScoreColor } from '../../utils/helpers'

const DIMS = [
  { label: 'Technical Skills', key: 'technicalSkills' },
  { label: 'Experience', key: 'experience' },
  { label: 'Education', key: 'education' },
  { label: 'Soft Skills', key: 'softSkills' },
]

export default function CompareView({ candidates, onClose, onRemove }) {
  if (!candidates || candidates.length === 0) return null

  const getHighlight = (key) => {
    const vals = candidates.map((c) => c.scores[key])
    const max = Math.max(...vals)
    return (val) => val === max
  }

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Compare Candidates</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X size={22} /></button>
        </div>

        <div className={`grid gap-6 grid-cols-1 ${candidates.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {candidates.map((c) => {
            const displayName = c.candidateName && c.candidateName.trim() ? c.candidateName.trim() : null
            return (
              <div key={c.rank} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    {displayName ? (
                      <>
                        <p className="text-sm font-bold text-gray-900">{displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{c.fileName}</p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800 break-all">{c.fileName}</p>
                    )}
                    {c.candidateEmail && (
                      <a href={`mailto:${c.candidateEmail}`} className="flex items-center gap-1 text-xs text-green-600 hover:underline mt-0.5">
                        <Mail size={10} /> {c.candidateEmail}
                      </a>
                    )}
                    <span className={`text-2xl font-bold ${getScoreColor(c.scores.final)}`}>{c.scores.final}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <RecommendationBadge recommendation={c.recommendation} />
                    <button onClick={() => onRemove(c.rank)} className="text-xs text-gray-400 hover:text-red-500 mt-1">Remove</button>
                  </div>
                </div>

                <div className="space-y-3">
                  {DIMS.map((d) => {
                    const isHighest = getHighlight(d.key)(c.scores[d.key])
                    return (
                      <div key={d.key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">{d.label}</span>
                          <span className={`font-semibold ${isHighest ? 'text-green-600' : 'text-gray-500'}`}>
                            {c.scores[d.key]}
                          </span>
                        </div>
                        <ScoreBar score={c.scores[d.key]} height="h-2" />
                      </div>
                    )
                  })}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Strengths</p>
                  <ul className="space-y-1">
                    {c.strengths?.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">Gaps</p>
                  <ul className="space-y-1">
                    {c.gaps?.map((g, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <XCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />{g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
