import { useState } from 'react'
import { AlignLeft, FileText } from 'lucide-react'
import FileDropzone from '../shared/FileDropzone'
import useJD from '../../hooks/useJD'

export default function JDInput({ onSaved }) {
  const [tab, setTab] = useState('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const { saveJDText, saveJDFile } = useJD()

  const handleSave = async () => {
    setSaving(true)
    try {
      if (tab === 'text') {
        await saveJDText(title, content)
        setTitle(''); setContent('')
      } else {
        await saveJDFile(file, title)
        setFile(null); setTitle('')
      }
      onSaved?.()
    } catch {
      // toast shown in hook
    } finally {
      setSaving(false)
    }
  }

  const canSave = tab === 'text'
    ? title.trim().length > 0 && content.trim().length >= 50
    : file !== null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="text-base font-semibold text-gray-800">Add Job Description</h3>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {[{ id: 'text', label: 'Paste Text', icon: AlignLeft }, { id: 'pdf', label: 'Upload PDF', icon: FileText }].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200 ${
              tab === t.id ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon size={13} />{t.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="JD Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
      />

      {tab === 'text' ? (
        <textarea
          placeholder="Paste the full job description here (min 50 characters)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
        />
      ) : (
        <FileDropzone
          onDrop={(files) => setFile(files[0])}
          multiple={false}
          label={file ? file.name : 'Drop JD PDF here or click to browse'}
        />
      )}

      <button
        onClick={handleSave}
        disabled={!canSave || saving}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          canSave && !saving
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
        }`}
      >
        {saving ? 'Saving...' : 'Save Job Description'}
      </button>
    </div>
  )
}
