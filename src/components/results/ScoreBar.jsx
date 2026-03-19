import { getBarColor } from '../../utils/helpers'

export default function ScoreBar({ score, height = 'h-1.5' }) {
  return (
    <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden`}>
      <div
        className={`${height} rounded-full transition-all duration-700 ${getBarColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  )
}
