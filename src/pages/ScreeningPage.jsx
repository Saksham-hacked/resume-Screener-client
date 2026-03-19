import ScreeningForm from '../components/screening/ScreeningForm'

export default function ScreeningPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Screen Candidates</h1>
        <p className="text-sm text-gray-500 mt-1">Configure your job description, set weightages, and upload resumes to begin AI screening</p>
      </div>
      <ScreeningForm />
    </div>
  )
}
