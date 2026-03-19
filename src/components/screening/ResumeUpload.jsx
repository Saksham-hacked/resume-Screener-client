import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, X } from 'lucide-react'

const formatSize = (bytes) => (bytes / 1024).toFixed(1) + ' KB'

export default function ResumeUpload({ files, onDrop, onRemove }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`min-h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 p-8 ${
          isDragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud size={40} className={isDragActive ? 'text-green-500' : 'text-gray-400'} />
        <p className="mt-3 text-sm font-medium text-gray-700">Drop resumes here or click to browse</p>
        <p className="mt-1 text-xs text-gray-400">PDF only • Max 10 files • 5MB each</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{files.length} resume{files.length > 1 ? 's' : ''} ready</p>
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 transition-all duration-200 translate-y-0">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-gray-400">{formatSize(file.size)}</span>
              </div>
              <button onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
