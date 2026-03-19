import { useState, useEffect } from 'react'
import { FileText, AlignLeft, FolderOpen } from 'lucide-react'
import FileDropzone from '../shared/FileDropzone'
import WeightageSliders from './WeightageSliders'
import useJD from '../../hooks/useJD'

const TABS = [
  { id: 'text', label: 'Paste Text', icon: AlignLeft },
  { id: 'pdf', label: 'Upload PDF', icon: FileText },
  { id: 'saved', label: 'Use Saved JD', icon: FolderOpen },
]

const DEFAULT_WEIGHTAGES = { technicalSkills: 40, experience: 30, education: 20, softSkills: 10 }

export default function ScreeningConfig({ onConfigChange }) {
  const [tab, setTab] = useState('text')
  const [jdTitle, setJdTitle] = useState('')
  const [jdText, setJdText] = useState('')
  const [jdFile, setJdFile] = useState(null)
  const [selectedJDId, setSelectedJDId] = useState('')
  const [weightages, setWeightages] = useState(DEFAULT_WEIGHTAGES)
  const { jds, fetchJDs } = useJD()

  useEffect(() => { fetchJDs() }, [fetchJDs])

  useEffect(() => {
    const total = Object.values(weightages).reduce((a, b) => a + Number(b), 0)
    onConfigChange({ tab, jdTitle, jdText, jdFile, selectedJDId, weightages, isWeightageValid: total > 0 })
  }, [tab, jdTitle, jdText, jdFile, selectedJDId, weightages])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-800">Job Description</h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-md transition-colors duration-200 ${
                tab === t.id ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'text' && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="JD Title"
              value={jdTitle}
              onChange={(e) => setJdTitle(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
            />
            <textarea
              placeholder="Paste the full job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={8}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none min-h-48 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
            />
          </div>
        )}

        {tab === 'pdf' && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="JD Title (optional)"
              value={jdTitle}
              onChange={(e) => setJdTitle(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
            />
            <FileDropzone
              onDrop={(files) => setJdFile(files[0])}
              multiple={false}
              label={jdFile ? jdFile.name : 'Drop JD PDF here or click to browse'}
              hint="PDF only • Max 5MB"
            />
          </div>
        )}

        {tab === 'saved' && (
          <select
            value={selectedJDId}
            onChange={(e) => setSelectedJDId(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
          >
            <option value="">Select a saved JD...</option>
            {jds.map((jd) => (
              <option key={jd._id} value={jd._id}>{jd.title}</option>
            ))}
          </select>
        )}
      </div>

      <hr className="border-gray-100" />

      <WeightageSliders weightages={weightages} onChange={setWeightages} />
    </div>
  )
}
