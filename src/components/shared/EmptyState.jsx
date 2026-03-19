import { useNavigate } from 'react-router-dom'

export default function EmptyState({ icon: Icon, title, description, ctaLabel, ctaPath }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      {Icon && <Icon size={48} className="text-gray-300" />}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs">{description}</p>}
      {ctaLabel && ctaPath && (
        <button
          onClick={() => navigate(ctaPath)}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
