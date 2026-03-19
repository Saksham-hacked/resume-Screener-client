import { Trash2, Calendar } from 'lucide-react'
import { formatDate } from '../../utils/helpers'

export default function JDCard({ jd, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{jd.title}</h3>
        <button
          onClick={() => onDelete(jd._id)}
          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
        >
          <Trash2 size={15} />
        </button>
      </div>
      <p className="text-xs text-gray-500 line-clamp-3">{jd.content}</p>
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Calendar size={12} />
        <span>{formatDate(jd.uploadedAt)}</span>
      </div>
    </div>
  )
}
