import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ScreeningConfig from './ScreeningConfig'
import ResumeUpload from './ResumeUpload'
import LoadingSpinner from '../shared/LoadingSpinner'
import useScreening from '../../hooks/useScreening'
import useJD from '../../hooks/useJD'

export default function ScreeningForm() {
  const navigate = useNavigate()
  const { loading, runScreening } = useScreening()
  const { saveJDText, saveJDFile } = useJD()

  const [config, setConfig] = useState(null)
  const [resumes, setResumes] = useState([])

  const handleDrop = useCallback((accepted) => {
    setResumes((prev) => {
      const combined = [...prev, ...accepted]
      return combined.slice(0, 10)
    })
  }, [])

  const handleRemove = (index) => {
    setResumes((prev) => prev.filter((_, i) => i !== index))
  }

  const isReady = () => {
    if (!config || !config.isWeightageValid) return false
    if (resumes.length === 0) return false
    if (config.tab === 'text' && (!config.jdTitle.trim() || !config.jdText.trim())) return false
    if (config.tab === 'pdf' && !config.jdFile) return false
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
      // toast already shown in hooks
    }
  }

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
            Screening {resumes.length} resume{resumes.length > 1 ? 's' : ''}...
          </span>
        ) : (
          `Screen ${resumes.length > 0 ? resumes.length : ''} Candidate${resumes.length !== 1 ? 's' : ''}`
        )}
      </button>
    </div>
  )
}
