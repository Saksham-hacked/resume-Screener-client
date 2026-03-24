import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileText, FileType2, X } from 'lucide-react'

const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    : (bytes / 1024).toFixed(1) + ' KB'

const isDocx = (file) =>
  file.name.toLowerCase().endsWith('.docx') ||
  file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

export default function ResumeUpload({ files, onDrop, onRemove }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.docx'],
    },
    multiple: true,
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
  })

  const pdfCount  = files.filter((f) => !isDocx(f)).length
  const docxCount = files.filter((f) =>  isDocx(f)).length

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
        <p className="mt-1 text-xs text-gray-400">PDF or DOCX • Max 20 files • 10 MB each</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
            <FileText size={11} className="text-red-400" /> PDF
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
            <FileType2 size={11} className="text-blue-400" /> DOCX
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {files.length} resume{files.length > 1 ? 's' : ''} ready
            </p>
            {pdfCount > 0 && (
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {pdfCount} PDF
              </span>
            )}
            {docxCount > 0 && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {docxCount} DOCX
              </span>
            )}
          </div>
          {files.map((file, i) => {
            const docx = isDocx(file)
            return (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  {docx
                    ? <FileType2 size={16} className="text-blue-500 flex-shrink-0" />
                    : <FileText  size={16} className="text-green-600 flex-shrink-0" />
                  }
                  <span className="text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    docx ? 'text-blue-600 bg-blue-50' : 'text-red-500 bg-red-50'
                  }`}>
                    {docx ? 'DOCX' : 'PDF'}
                  </span>
                  <span className="text-xs text-gray-400">{formatSize(file.size)}</span>
                </div>
                <button onClick={() => onRemove(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
