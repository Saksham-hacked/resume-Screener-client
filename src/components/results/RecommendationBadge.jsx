export default function RecommendationBadge({ recommendation }) {
  const styles = {
    'Strong Fit': 'bg-green-100 text-green-700',
    'Moderate Fit': 'bg-amber-100 text-amber-700',
    'Not Fit': 'bg-red-100 text-red-700',
  }
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${styles[recommendation] || 'bg-gray-100 text-gray-600'}`}>
      {recommendation}
    </span>
  )
}
