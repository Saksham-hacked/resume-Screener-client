import { X, CheckCircle, XCircle } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import RecommendationBadge from './RecommendationBadge'
import ScoreBar from './ScoreBar'
import { getScoreColor } from '../../utils/helpers'

export default function CandidateDrawer({ candidate, onClose, onAddCompare }) {
  if (!candidate) return null

  const { fileName, scores, strengths, gaps, recommendation, topSkills, explanation } = candidate

  const radarData = [
    { subject: 'Technical', value: scores.technicalSkills },
    { subject: 'Experience', value: scores.experience },
    { subject: 'Education', value: scores.education },
    { subject: 'Soft Skills', value: scores.softSkills },
    { subject: 'Overall', value: scores.final },
  ]

  const dimensions = [
    { label: 'Technical Skills', value: scores.technicalSkills },
    { label: 'Experience', value: scores.experience },
    { label: 'Education', value: scores.education },
    { label: 'Soft Skills', value: scores.softSkills },
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full md:w-2/5 bg-white z-50 shadow-md overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900 break-all">{fileName}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-3xl font-bold ${getScoreColor(scores.final)}`}>{scores.final}</span>
                <RecommendationBadge recommendation={recommendation} />
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors"><X size={20} /></button>
          </div>

          {/* Score Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</h3>
            <div className="space-y-3">
              {dimensions.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{d.label}</span>
                    <span className={`font-semibold ${getScoreColor(d.value)}`}>{d.value}</span>
                  </div>
                  <ScoreBar score={d.value} height="h-2.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Score Radar</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6B7280' }} />
                <Radar dataKey="value" stroke="#16A34A" fill="#16A34A" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Skills */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {topSkills?.map((skill) => (
                <span key={skill} className="bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Strengths</h3>
            <ul className="space-y-2">
              {strengths?.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Gaps</h3>
            <ul className="space-y-2">
              {gaps?.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <XCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Explanation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Why This Score</h3>
            <p className="text-sm text-gray-600 italic bg-gray-100 rounded-lg p-4">{explanation}</p>
          </div>

          {/* Compare button */}
          <button
            onClick={() => { onAddCompare(candidate); onClose() }}
            className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            Add to Compare
          </button>
        </div>
      </div>
    </>
  )
}
