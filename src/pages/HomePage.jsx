import { useNavigate } from 'react-router-dom'
import { Zap, SlidersHorizontal, BarChart2, Leaf } from 'lucide-react'

const FEATURES = [
  { icon: Zap, title: 'Instant Scoring', desc: 'AI scores every resume against your JD in seconds' },
  { icon: SlidersHorizontal, title: 'Custom Weightages', desc: 'Prioritize technical skills, experience or education' },
  { icon: BarChart2, title: 'Detailed Insights', desc: 'Strengths, gaps and explainability for every candidate' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Leaf size={32} className="text-green-200" />
            <h1 className="text-3xl font-bold text-white tracking-tight">NutaScreener</h1>
          </div>
          <p className="text-xl font-semibold text-white">AI-Powered Resume Screening for Smarter Hiring</p>
          <p className="text-green-100 text-sm leading-relaxed">
            Upload resumes, set your priorities, and let AI rank your candidates in seconds
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/screening')}
              className="bg-white text-green-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm"
            >
              Start Screening
            </button>
            <button
              onClick={() => navigate('/history')}
              className="border border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm"
            >
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <f.icon size={20} className="text-green-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
