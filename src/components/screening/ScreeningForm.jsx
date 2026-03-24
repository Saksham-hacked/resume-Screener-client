import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Clock, Loader2 } from 'lucide-react'
import ScreeningConfig from './ScreeningConfig'
import ResumeUpload from './ResumeUpload'
import useScreening from '../../hooks/useScreening'
import useJD from '../../hooks/useJD'

const REC_COLORS = {
  'Strong Fit':   'text-green-600 bg-green-50 border-green-200',
  'Moderate Fit': 'text-amber-600 bg-amber-50 border-amber-200',
  'Not Fit':      'text-red-500 bg-red-50 border-red-200',
}

const REC_DOT = {
  'Strong Fit':   'bg-green-500',
  'Moderate Fit': 'bg-amber-400',
  'Not Fit':      'bg-red-400',
}

export default function ScreeningForm() {
  const navigate = useNavigate()
  const { loading, progress, runScreening } = useScreening()
  const { saveJDText, saveJDFile } = useJD()

  const [config, setConfig]   = useState(null)
  const [resumes, setResumes] = useState([])

  const handleDrop = useCallback((accepted) => {
    setResumes((prev) => [...prev, ...accepted].slice(0, 20))
  }, [])

  const handleRemove = (index) => {
    setResumes((prev) => prev.filter((_, i) => i !== index))
  }

  const isReady = () => {
    if (!config || !config.isWeightageValid) return false
    if (resumes.length === 0) return false
    if (config.tab === 'text' && (!config.jdTitle.trim() || !config.jdText.trim())) return false
    if (config.tab === 'pdf'  && !config.jdFile)        return false
    if (config.tab === 'saved' && !config.selectedJDId) return false
    return true
  }

  const handleSubmit = async () => {
    if (!isReady()) return
    try {
      let jdId = config.selectedJDId
      if (config.tab === 'text') {
        const jd = await saveJDText(config.jdTitle, config.jdText)
        jdId = jd._id
      } else if (config.tab === 'pdf') {
        const jd = await saveJDFile(config.jdFile, config.jdTitle)
        jdId = jd._id
      }
      const data = await runScreening({ jdId, weightages: config.weightages, resumes })
      navigate(`/results/${data.sessionId}`)
    } catch {
      // toast already shown in hook
    }
  }

  // ── Progress panel (shown while loading) ────────────────────────────────
  const { processed, total, items } = progress
  const pct = total > 0 ? Math.round((processed / total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="lg:grid lg:grid-cols-3 lg:gap-6 space-y-6 lg:space-y-0">
        <div className="lg:col-span-1">
          <ScreeningConfig onConfigChange={setConfig} />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Upload Resumes</h3>
            <ResumeUpload files={resumes} onDrop={handleDrop} onRemove={handleRemove} />
          </div>
        </div>
      </div>

      {/* ── Live progress panel ── */}
      {loading && total > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="text-green-600 animate-spin" />
              <span className="text-sm font-semibold text-gray-800">
                Screening in progress…
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {processed} / {total} resumes
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Per-resume results as they arrive */}
          {items.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    <div className="min-w-0">
                      {item.candidateName ? (
                        <>
                          <p className="text-xs font-semibold text-gray-800 truncate">{item.candidateName}</p>
                          <p className="text-xs text-gray-400 truncate">{item.fileName}</p>
                        </>
                      ) : (
                        <p className="text-xs text-gray-700 truncate">{item.fileName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-gray-700">{item.finalScore}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${REC_COLORS[item.recommendation] || ''}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${REC_DOT[item.recommendation] || 'bg-gray-400'}`} />
                      {item.recommendation}
                    </span>
                  </div>
                </div>
              ))}

              {/* Pending items */}
              {Array.from({ length: total - processed }).map((_, i) => (
                <div
                  key={`pending-${i}`}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <Clock size={14} className="text-gray-300 flex-shrink-0" />
                  <span className="text-xs text-gray-400">Waiting…</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!isReady() || loading}
        className={`w-full py-3 rounded-xl text-base font-semibold transition-colors duration-200 ${
          isReady() && !loading
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            {pct}% — {processed} of {total} done
          </span>
        ) : (
          `Screen ${resumes.length > 0 ? resumes.length : ''} Candidate${resumes.length !== 1 ? 's' : ''}`
        )}
      </button>
    </div>
  )
}
