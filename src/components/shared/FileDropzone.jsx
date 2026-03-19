import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'

export default function FileDropzone({ onDrop, accept = { 'application/pdf': ['.pdf'] }, multiple = false, label = 'Drop file here or click to browse', hint = 'PDF only • Max 5MB' }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple, maxSize: 5 * 1024 * 1024 })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
        isDragActive ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud size={36} className={isDragActive ? 'text-green-500' : 'text-gray-400'} />
      <p className="mt-3 text-sm font-medium text-gray-700">{label}</p>
      <p className="mt-1 text-xs text-gray-400">{hint}</p>
    </div>
  )
}
