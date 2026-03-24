import RecommendationBadge from './RecommendationBadge'
import ScoreBar from './ScoreBar'
import { getScoreColor } from '../../utils/helpers'
import { Mail, Phone } from 'lucide-react'

const MEDALS = ['🥇', '🥈', '🥉']

export default function CandidateRow({ candidate, onViewDetails, onAddCompare }) {
  const { rank, fileName, candidateName, candidateEmail, candidatePhone, scores, recommendation } = candidate

  const displayName = candidateName && candidateName.trim() ? candidateName.trim() : null
  const shortFile   = fileName.length > 24 ? fileName.slice(0, 21) + '...' : fileName

  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${rank === 1 ? 'border-l-4 border-green-500' : ''}`}>
      <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">
        {rank <= 3 ? MEDALS[rank - 1] : null} {rank}
      </td>
      <td className="px-4 py-3 max-w-[200px]">
        {displayName ? (
          <div>
            <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
            <p className="text-xs text-gray-400 truncate" title={fileName}>{shortFile}</p>
            <div className="flex flex-col gap-0.5 mt-0.5">
              {candidateEmail && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Mail size={10} /> {candidateEmail}
                </span>
              )}
              {candidatePhone && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Phone size={10} /> {candidatePhone}
                </span>
              )}
            </div>
          </div>
        ) : (
          <span className="text-sm text-gray-800 truncate block" title={fileName}>{shortFile}</span>
        )}
      </td>
      <td className="px-4 py-3 min-w-[100px]">
        <span className={`text-lg font-bold ${getScoreColor(scores.final)}`}>{scores.final}</span>
        <ScoreBar score={scores.final} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-700">{scores.technicalSkills}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{scores.experience}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{scores.education}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{scores.softSkills}</td>
      <td className="px-4 py-3"><RecommendationBadge recommendation={recommendation} /></td>
      <td className="px-4 py-3">
        <button
          onClick={() => onViewDetails(candidate)}
          className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 mr-2"
        >
          View Details
        </button>
        <button
          onClick={() => onAddCompare(candidate)}
          className="text-xs border border-gray-200 hover:bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg font-medium transition-colors duration-200"
        >
          Compare
        </button>
      </td>
    </tr>
  )
}
