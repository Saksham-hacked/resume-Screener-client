import RecommendationBadge from './RecommendationBadge'
import ScoreBar from './ScoreBar'
import { getScoreColor } from '../../utils/helpers'

const MEDALS = ['🥇', '🥈', '🥉']

export default function CandidateRow({ candidate, onViewDetails, onAddCompare }) {
  const { rank, fileName, scores, recommendation } = candidate
  const shortName = fileName.length > 28 ? fileName.slice(0, 25) + '...' : fileName

  return (
    <tr className={`hover:bg-gray-50 transition-colors duration-150 ${rank === 1 ? 'border-l-4 border-green-500' : ''}`}>
      <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">
        {rank <= 3 ? MEDALS[rank - 1] : null} {rank}
      </td>
      <td className="px-4 py-3 max-w-[180px]" title={fileName}>
        <span className="text-sm text-gray-800 truncate block">{shortName}</span>
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
